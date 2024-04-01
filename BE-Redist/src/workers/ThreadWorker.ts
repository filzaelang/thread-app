import * as amqp from "amqplib"
import cloudinary from "../libs/cloudinary"
import { Repository } from "typeorm"
import { Thread } from "../entity/Thread"
import { AppDataSource } from "../data-source"
import { EventEmitter } from "stream";
import { request } from "http";

export default new class ThreadWorker extends EventEmitter {
    private readonly ThreadWorker: Repository<Thread> = AppDataSource.getRepository(Thread)

    async create(queueName: string, connection: amqp.Connection) {
        try {
            const channel = await connection.createChannel()
            await channel.assertQueue(queueName)
            await channel.consume(queueName, async (message) => {
                try {
                    const data = JSON.parse(message.content.toString())

                    if (data.image === null) {
                        const obj = this.ThreadWorker.create({
                            content: data.content,
                            image: data.image,
                            created_by: {
                                id: data.created_by
                            },
                            created_at: data.created_at,
                            updated_by: {
                                id: data.created_by
                            },
                            updated_at: data.updated_at,
                        })

                        await this.ThreadWorker.save(obj)

                        // request to server
                        const req = request({
                            hostname: "localhost",
                            port: 5000,
                            path: "/api/v1/new-thread",
                            method: "GET",
                        });

                        req.on("error", (error) => {
                            console.error("Error sending request:", error);
                        });

                        req.end();

                        console.log("Thread is Created !")

                        channel.ack(message)
                    } else {
                        const cloudinaryConfig = await cloudinary.destination(data.image)

                        const obj = this.ThreadWorker.create({
                            content: data.content,
                            image: cloudinaryConfig.secure_url,
                            created_by: {
                                id: data.created_by
                            },
                            created_at: data.created_at,
                            updated_by: {
                                id: data.created_by
                            },
                            updated_at: data.updated_at,
                        })

                        await this.ThreadWorker.save(obj)

                        console.log("Thread is Created !")

                        channel.ack(message)
                    }
                } catch (error) {
                    console.log(error)
                }
            })
        } catch (error) {
            console.log({ message: error })
        }
    }
}
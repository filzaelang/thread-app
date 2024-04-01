import * as amqp from "amqplib"
import cloudinary from "../libs/cloudinary"
import { Repository } from "typeorm"
import { Thread } from "../entity/Thread"
import { AppDataSource } from "../data-source"
import { EventEmitter } from "stream"
import { request } from "http";
import * as express from "express";

const router = express.Router();

export default new class ThreadWorker extends EventEmitter {
    private readonly ThreadWorker: Repository<Thread> = AppDataSource.getRepository(Thread)

    async create(queueName: string, connection: amqp.Connection) {
        try {
            const channel = await connection.createChannel()
            await channel.assertQueue(queueName)
            await channel.consume(queueName, async (message) => {
                try {
                    const data = JSON.parse(message.content.toString())
                    // console.log(data)
                    let obj;
                    if (data.image === null) {
                        obj = this.ThreadWorker.create({
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

                    } else {
                        const cloudinaryConfig = await cloudinary.destination(data.image)
                        obj = this.ThreadWorker.create({
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
                    }
                    await this.ThreadWorker.save(obj)

                    // Send SSE notification
                    // const sseData = JSON.stringify({ data: "New Thread!" });
                    // sendSSENotification(sseData);

                    console.log("Thread is Created !")
                    channel.ack(message)
                } catch (error) {
                    console.log(error)
                }
            })
        } catch (error) {
            console.log({ message: error })
        }
    }
}

function sendSSENotification(data: any) {
    // Broadcast SSE notification to all connected clients
    router.get("/notification", (req: express.Request, res: express.Response) => {
        res.write("data: " + data + "\n\n");
    });
}
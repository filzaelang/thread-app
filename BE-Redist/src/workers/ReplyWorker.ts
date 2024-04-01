import * as amqp from "amqplib"
import { Repository } from "typeorm"
import { Replie } from "../entity/Replie"
import { AppDataSource } from "../data-source"
import cloudinary from "../libs/cloudinary"

export default new class ReplyWorker {
    private readonly ReplyWorker: Repository<Replie> = AppDataSource.getRepository(Replie)
    async create(queueName: string, connection: amqp.Connection) {
        try {
            const channel = await connection.createChannel()
            await channel.assertQueue(queueName)
            await channel.consume(queueName, async (message) => {
                try {
                    const data = JSON.parse(message.content.toString())
                    // console.log(data)
                    if (data.image === null) {
                        const obj = this.ReplyWorker.create({
                            content: data.content,
                            thread_id: {
                                id: data.thread_id,
                            },
                            created_by: {
                                id: data.created_by,
                            },
                            created_at: data.created_at,
                            updated_by: {
                                id: data.created_by,
                            },
                            updated_at: data.updated_at,
                        })

                        await this.ReplyWorker.save(obj)
                        console.log("Reply is created")
                        channel.ack(message)
                    } else {
                        const cloudinaryConfig = await cloudinary.destination(data.image)
                        const obj = this.ReplyWorker.create({
                            content: data.content,
                            image: cloudinaryConfig.secure_url,
                            thread_id: {
                                id: data.thread_id,
                            },
                            created_by: {
                                id: data.created_by,
                            },
                            created_at: data.created_at,
                            updated_by: {
                                id: data.updated_by,
                            },
                            updated_at: data.updated_at,
                        })

                        await this.ReplyWorker.save(obj)
                        console.log("Reply is created")
                        channel.ack(message)
                    }
                } catch (error) {
                    console.log(error)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}
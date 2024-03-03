import * as amqp from "amqplib"
import cloudinary from "../libs/cloudinary"
import { Repository } from "typeorm"
import { Thread } from "../entity/Thread"
import { AppDataSource } from "../data-source"

export default new class ThreadWorker {
    private readonly ThreadWorker: Repository<Thread> = AppDataSource.getRepository(Thread)

    async create(queueName: string, connection: amqp.Connection) {
        try {
            const channel = await connection.createChannel()
            await channel.assertQueue(queueName)
            await channel.consume(queueName, async (message) => {
                try {
                    const data = JSON.parse(message.content.toString())
                    // console.log(data)
                    // const cloudinaryConfig = await cloudinary.destination(data.image)

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
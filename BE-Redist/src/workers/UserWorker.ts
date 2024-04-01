import * as amqp from "amqplib"
import { Repository } from "typeorm"
import { User } from "../entity/User"
import { AppDataSource } from "../data-source"
import cloudinary from "../libs/cloudinary"

export default new class UserWorker {
    private readonly UserWorker: Repository<User> = AppDataSource.getRepository(User)
    async update(queueName: string, connection: amqp.Connection) {
        try {
            const channel = await connection.createChannel()
            await channel.assertQueue(queueName)
            await channel.consume(queueName, async (message) => {
                try {
                    const data = JSON.parse(message.content.toString())
                    // console.log(data)
                    if (data.photo_profile === null) {
                        const obj = this.UserWorker.create({
                            description: data.description,
                            full_name: data.full_name
                        })

                        await this.UserWorker.update(data.idUser, obj)
                        console.log("User is Updated !")
                        channel.ack(message)
                    } else {
                        const cloudinaryConfig = await cloudinary.destination(data.photo_profile)
                        const obj = this.UserWorker.create({
                            description: data.description,
                            full_name: data.full_name,
                            photo_profile: cloudinaryConfig.secure_url
                        })

                        await this.UserWorker.update(data.idUser, obj)
                        console.log("User is Updated !")
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
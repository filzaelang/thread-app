import { Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import RabbitMQConfig from "../libs/rabbitmq";
import cloudinary from "../libs/cloudinary";
import "dotenv/config"


export default new class UserQueue {
    async update(req: Request, res: Response): Promise<Response> {
        try {
            const loginSession = res.locals.loginSession

            let image = req.file ? res.locals.filename : null

            const payload = {
                idUser: loginSession.obj.id,
                full_name: req.body.full_name,
                description: req.body.description,
                photo_profile: image,
            }

            const errorQueue = await RabbitMQConfig.sendToMessage(process.env.USER_QUEUE_NAME, payload)
            if (errorQueue) return res.status(500).json({ message: errorQueue })

            return res.status(201).json({
                message: "user is queued!!",
                payload
            })
        } catch (error) {
            return res.status(500).json({ message: error })
        }
    }
}
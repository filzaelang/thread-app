import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Replie } from "../entity/Replie";
import { AppDataSource } from "../data-source";
import { createReplyValidation } from "../utils/validator/RepliesValidator";
import RabbitMQConfig from "../libs/rabbitmq";
import "dotenv/config"

export default new class ReplyQueue {
    async create(req: Request, res: Response): Promise<Response> {
        try {
            const loginSession = res.locals.loginSession

            const data = {
                content: req.body.content ? req.body.content : null,
                image: req.file ? res.locals.filename : null,
                thread_id: parseInt(req.body.thread_id),
            }

            const { error, value } = createReplyValidation.validate(data)
            if (error) return res.status(400).json(error)

            const payload = {
                ...value,
                created_by: loginSession.obj.id,
                created_at: new Date(),
                updated_by: loginSession.obj.id,
                updated_at: new Date(),
            }

            const errorQueue = await RabbitMQConfig.sendToMessage(process.env.REPLY_QUEUE_NAME, payload)
            if (errorQueue) return res.status(500).json({ message: error })

            return res.status(201).json({
                message: "reply is queued!!",
                data: payload,
            })
        } catch (error) {
            return res.status(500).json({ message: error })
        }
    }
}
import { Request, Response } from "express";
import { createThread } from "../utils/validator/ThreadValidator";
import cloudinary from "../libs/cloudinary";
import RabbitMQConfig from "../libs/rabbitmq";
import "dotenv/config"

export default new class ThreadQueue {
    async create(req: Request, res: Response): Promise<Response> {
        try {
            const loginSession = res.locals.loginSession

            const data = {
                content: req.body.content ? req.body.content : null,
                image: req.file ? res.locals.filename : null,
            }

            const { error, value } = createThread.validate(data);
            if (error) return res.status(400).json(error);

            if (req.file) {
                cloudinary.upload();
                const cloudinaryRes = await cloudinary.destination(value.image)
                value.image = cloudinaryRes.secure_url
            }

            const payload = {
                ...value,
                created_by: loginSession.obj.id,
                created_at: new Date(),
                updated_by: loginSession.obj.id,
                updated_at: new Date(),
            };

            const errorQueue = await RabbitMQConfig.sendToMessage(process.env.QUEUE_NAME, payload)
            if (errorQueue) return res.status(500).json({ message: errorQueue })

            return res.status(201).json({
                message: "thread is queued!!",
                data: payload
            })

        } catch (error) {
            return res.status(500).json({ message: error })
        }
    }
}



























// import { Request, Response } from "express";


// export default new class ThreadQueue {
//     async create(req: Request, rea: Response): Promise<Response> {
//         try {
//             const data = {
//                 content: req.body.content,
//                 image: resolve.locals.filename
//             }

//             //validate
//             //validate

//             const user = res.locals.loginSession
//             const payload = {
//                 content: // value.content,
//                     image: // value.image
//                 user: // user.obj.id
//             }

//             const errorQueue = await RabbitMQConfig.sendToMessage(process.env.QUEUE_NAME, payload)
//             if (errorQueue) return // res.status(500).json({message: errorQueue})


//         } catch (error) {

//         }
//     }
// }
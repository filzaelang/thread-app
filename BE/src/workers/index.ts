import { AppDataSource } from "../data-source"
import cloudinary from "../libs/cloudinary"
import * as amqp from "amqplib"
import "dotenv/config"
import ThreadWorker from "./ThreadWorker"
import UserWorker from "./UserWorker"
import ReplyWorker from "./ReplyWorker"
// import ThreadWorker from "./ThreadWorker"

export default new class WorkerHub {
    constructor() {
        AppDataSource.initialize()
            .then(async () => {
                cloudinary.upload()

                const connection = await amqp.connect(process.env.URL_CONNECT)

                // ThreadWorker
                ThreadWorker.create(process.env.THREAD_QUEUE_NAME, connection)

                // UserWorker
                UserWorker.update(process.env.USER_QUEUE_NAME, connection)

                // ReplyWorker
                ReplyWorker.create(process.env.REPLY_QUEUE_NAME, connection)
            })
            .catch()
    }
}
import { AppDataSource } from "./data-source"
import * as express from "express"
import router from "./route"
import * as cors from "cors"
import "dotenv/config"
import { redisClient } from "./libs/redis"


AppDataSource.initialize().then(async () => {
    const app = express()
    redisClient.on("error", (error) => console.log(error));

    app.use(cors())
    app.use(express.json())
    app.use("/api/v1", router)

    console.log("PORT:", process.env.PORT)
    app.listen(process.env.PORT, async () => {
        await redisClient.connect()
        console.log(`server running`)
    })

}).catch(error => console.log(error))

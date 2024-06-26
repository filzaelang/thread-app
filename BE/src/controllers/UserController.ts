import { Request, Response } from "express";
import UserServices from "../services/UserServices";
import cloudinary from "../libs/cloudinary";
import UserQueue from "../queue/UserQueue";

export default new class UserController {
    async find(req: Request, res: Response) {
        try {
            const loginSession = res.locals.loginSession
            const response = await UserServices.find(req.body, loginSession)
            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10)
            const loginSession = res.locals.loginSession
            const response = await UserServices.findOne(id, loginSession)
            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const loginSession = res.locals.loginSession
            const reqBody = req.body
            const file = req.file
            const fileName = res.locals.filename
            const response = await UserServices.update(reqBody, loginSession, file, fileName)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async updatePhotoProfile(req: Request, res: Response) {
        try {
            const loginSession = res.locals.loginSession
            const file = req.file
            const fileName = res.locals.filename
            const response = await UserServices.updatePhotoProfile(loginSession, file, fileName)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async updateBackgoundImage(req: Request, res: Response) {
        try {
            const loginSession = res.locals.loginSession
            const file = req.file
            const fileName = res.locals.filename
            const response = await UserServices.updateBackgroundProfile(loginSession, file, fileName)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async sugestedAccount(req: Request, res: Response) {
        try {
            const loginSession = res.locals.loginSession
            const response = await UserServices.sugestedAccount(loginSession)
            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const response = await UserServices.getAll()
            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}
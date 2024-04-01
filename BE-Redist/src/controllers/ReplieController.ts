import { Request, Response } from "express";
import ReplieServices from "../services/ReplieServices";
import ReplyQueue from "../queue/ReplyQueue";

export default new class RepliesController {

    async find(req: Request, res: Response) {
        try {
            const response = await ReplieServices.find(req.query);
            return res.status(200).json(response);
        } catch (error) {
            return res
                .status(500)
                .json({ error: error.message });
        }
    }

    async create(req: Request, res: Response) {
        try {
            ReplyQueue.create(req, res)
        } catch (error) {
            return res
                .status(500)
                .json({ error: error.message });
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const response = await ReplieServices.getOne(id);
            return res.status(200).json(response)
        } catch (error) {
            console.error("Error getting a reply", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({
                    message: "Invalid ID provided",
                    error: "Invalid input for type number",
                });
            }
            const data = req.body;

            const response = await ReplieServices.update(id, data);
            return res.status(201).json(response);
        } catch (error) {
            console.error("Error updating a reply", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const response = await ReplieServices.delete(id);

            if (typeof response === "string") {
                return res.status(404).json({ message: response });
            }

            return res.status(200).json({ message: response })
        } catch (error) {
            console.error("Error deleting a reply", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
}
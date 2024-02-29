import { Request, Response } from "express";
import AuthServices from "../services/AuthServices";
import { registerSchema, loginSchema } from "../utils/validator/AuthValidator";

export default new class AuthController {
    async register(req: Request, res: Response) {
        try {
            const data = req.body;

            const { error, value } = registerSchema.validate(data);
            if (error) return res.status(400).json(error);

            const response = await AuthServices.register(value);
            return res.status(201).json(response);
        } catch (error) {
            console.error("Error creating a user", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const data = req.body;
            const { error, value } = loginSchema.validate(data);
            if (error) return res.status(400).json(error);

            const response = await AuthServices.login(value);
            return res.status(201).json(response);
        } catch (error) {
            console.error("Error logging in", error);
            return res
                .status(500)
                .json({ message: "Internal server error", error: error.message });
        }
    }

    async check(req: Request, res: Response) {
        try {
            const loginSession = res.locals.loginSession;
            const response = await AuthServices.check(loginSession);

            return res.status(201).json(response);
        } catch (error) {
            console.error("Error checking", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
}
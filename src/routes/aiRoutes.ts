import { Router } from "express";
import { generateContent } from "../controller/aiController";

// api/v1/ai/generate
const router = Router()

router.get("/generate", generateContent)

export default router
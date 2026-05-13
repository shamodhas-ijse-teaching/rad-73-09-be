// customer.routes.ts
// customerRoutes.ts
import { Router } from "express"
import { getAllCustomer, saveCustomer } from "../controller/customerController"

const router = Router()

// /api/v1/customer
router.post("/", saveCustomer)

// /api/v1/customer/all
router.get("/all", getAllCustomer)

export default router

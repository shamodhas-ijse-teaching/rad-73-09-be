import { Router } from "express"
import {
  deleteItem,
  getAllItems,
  getItemByID,
  saveItem
} from "../controller/itemController"

const router = Router()

router.get("/:hello", getItemByID)
router.get("/all", getAllItems)
router.post("/save", saveItem)
router.delete("/:id", deleteItem)

export default router

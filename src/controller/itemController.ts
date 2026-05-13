import { Request, Response } from "express"
import { ItemModel } from "../models/itemModel"

export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await ItemModel.find()
    res.status(200).json({ message: "ok", data: items })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to retrieve items..!", error: err })
  }
}

export const getItemByID = async (req: Request, res: Response) => {
  try {
    // router.get("/:hello", getItemByID)
    const id = req.params.hello // :hello
    const item = await ItemModel.findById(id)

    if (!item) {
      return res.status(404).json({ message: "Item not found" })
    }

    res.status(200).json({ message: "ok", data: item })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to fetch item..!", error: err })
  }
}

export const saveItem = async (req: Request, res: Response) => {
  try {
    const newItem = new ItemModel(req.body)
    const savedItem = await newItem.save()
    res
      .status(200)
      .json({ message: "Item saved successfully..!", data: savedItem })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to save item..!", error: err })
  }
}

export const deleteItem = (req: Request, res: Response) => {
  try {
    // router.delete("/:id", deleteItem)
    // const id = req.params.id
    const { id } = req.params // object destructuring
    
    const item = ItemModel.findByIdAndDelete(id)
    if (!item) {
      return res.status(404).json({ message: "Item not found" })
    }

    res.status(200).json({ message: "Item deleted successfully" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to delete item..!", error: err })
  }
}

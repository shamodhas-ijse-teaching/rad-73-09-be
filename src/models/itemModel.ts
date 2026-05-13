import { Document, model, Schema } from "mongoose"

interface IItem extends Document {
  title: string
  qty: number
  unitPrice: number
}

const itemSchema = new Schema<IItem>(
  {
    title: { type: String, required: true },
    qty: { type: Number, required: true },
    unitPrice: { type: Number, required: true }
  },
  { timestamps: true }
)

export const ItemModel = model<IItem>("items", itemSchema)

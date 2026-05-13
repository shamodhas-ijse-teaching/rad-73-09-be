import { Request, Response } from "express"
import cloudinary from "../config/cloudinary"
import { PostModel } from "../models/postModel"
import { AuthRequest } from "../middleware/auth"

export const createPost = async (req: AuthRequest, res: Response) => {
  const { title, content, tags } = req.body
  try {
    let imageURL = ""
    if (req.file) {
      const result: any = await new Promise((resole, reject) => {
        const upload_stream = cloudinary.uploader.upload_stream(
          { folder: "posts" },
          (error, result) => {
            if (error) {
              return reject(error)
            }
            resole(result) // success return
          }
        )
        upload_stream.end(req.file?.buffer)
      })
      imageURL = result.secure_url
    }

    const newPost = new PostModel({
      title,
      content,
      tags,
      imageURL,
      author: req.user.sub
    })

    await newPost.save()

     res.status(201).json({
       message: "Post created",
       data: newPost
     })
  } catch (err) {
     console.error(err)
     res.status(500).json({ message: "Fail to create post" })
  }
}

// pagination
export const getAllPost = (req: Request, res: Response) => {}

export const getMyPost = (req: Request, res: Response) => {}

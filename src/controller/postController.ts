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
// query params
// /api/v1/post?page=1&limit=10
// 100 , 10
// 0, 10, 20, 30
export const getAllPost = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    // 2 = 1 * 10 = 10
    const skip = (page - 1) * limit

    console.log(req.query.page, limit)

    // impliment
    const posts = await PostModel.find() // get all
      .populate("author", "name email") // related models data
      .sort({ createdAt: -1 }) // change order
      .skip(skip) // ignore data for pagination
      .limit(limit) // data count currently need

    const totalDataCount = await PostModel.countDocuments()

    res.status(200).json({
      message: "Posts data",
      data: posts,
      totalPage: totalDataCount / limit,
      totalCount: totalDataCount,
      page
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to fetch posts" })
  }
}

// /api/v1/post?page=1&limit=10
export const getMyPost = async (req: AuthRequest, res: Response) => {
  // req.user.sub - userId
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    // 2 = 1 * 10 = 10
    const skip = (page - 1) * limit

    // impliment
    const posts = await PostModel.find({ author: req.user.sub }) // get all data with userID
      .populate("author", "name email") // related models data
      .sort({ createdAt: -1 }) // change order
      .skip(skip) // ignore data for pagination
      .limit(limit) // data count currently need

    const totalDataCount = await PostModel.countDocuments({
      author: req.user.sub
    })

    res.status(200).json({
      message: "Posts data",
      data: posts,
      totalPage: totalDataCount / limit,
      totalCount: totalDataCount,
      page
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to fetch posts" })
  }
}

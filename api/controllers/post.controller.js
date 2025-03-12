import Post from "../models/post.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import { errorHandler } from "../utils/error.js";

export const create = catchAsync(async (req, res, next) => {
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  const savedPost = await newPost.save();
  res.status(201).json(savedPost);
});

export const getposts = catchAsync(async (req, res, next) => {
  const startIndex = parseInt(req.query.startIndex) || 0;
  const limit = parseInt(req.query.limit) || 9;
  const sortDirection = req.query.sort === "asc" ? 1 : -1;

  const posts = await Post.find({
    ...(req.query.userId && { userId: req.query.userId }),
    ...(req.query.category && { category: req.query.category }),
    ...(req.query.slug && { slug: req.query.slug }),
    ...(req.query.postId && { _id: req.query.postId }),
    ...(req.query.searchTerm && {
      $or: [
        { title: { $regex: req.query.searchTerm, $options: "i" } },
        { content: { $regex: req.query.searchTerm, $options: "i" } },
        { category: { $regex: req.query.searchTerm, $options: "i" } },
      ],
    }),
  })
    .populate({
      path: 'userId',
      select: 'username'
    })
    .sort({ updatedAt: sortDirection })
    .skip(startIndex)
    .limit(limit);

  const totalPosts = await Post.countDocuments();

  const now = new Date();

  const oneMonthAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate()
  );

  const lastMonthPosts = await Post.countDocuments({
    createdAt: { $gte: oneMonthAgo },
  });

  res.status(200).json({
    posts,
    totalPosts,
    lastMonthPosts,
  });
});


export const deletePost = catchAsync(async (req, res, next) => {
  if (req.user.isAdmin || req.user.id !== req.params.userId) {
    console.log("error");

    return next(errorHandler(403, "You are not allowed to delete this post!"));
  }

  await Post.findByIdAndDelete(req.params.postId);
  res.status(200).json("The post has been deleted");
});

export const updatepost = catchAsync(async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this post"));
  }

  const updatedPost = await Post.findByIdAndUpdate(
    req.params.postId,
    {
      $set: {
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        image: req.body.image,
      },
    },
    { new: true }
  );
  res.status(200).json(updatedPost);
});
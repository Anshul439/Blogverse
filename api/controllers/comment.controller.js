import Comment from "../models/comment.model.js";
import { catchAsync } from "../utils/catchAsync.js";

export const createComment = catchAsync(async (req, res, next) => {
  const { content, postId, userId } = req.body;

  if (userId !== req.user.id) {
    return next(
      errorHandler(403, "You are not allowed to create this comment")
    );
  }

  const newComment = new Comment({
    content,
    postId,
    userId,
  });
  await newComment.save();

  res.status(200).json(newComment);
});

export const getPostComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.find({ postId: req.params.postId }).sort({
    createdAt: -1,
  });
  res.status(200).json(comments);
});

export const likeComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) {
    return next(errorHandler(404, "Comment not found"));
  }
  const userIndex = comment.likes.indexOf(req.user.id);
  if (userIndex === -1) {
    comment.numberOfLikes += 1;
    comment.likes.push(req.user.id);
  } else {
    comment.numberOfLikes -= 1;
    comment.likes.splice(userIndex, 1);
  }
  await comment.save();
  res.status(200).json(comment);
});

export const editComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) {
    return next(errorHandler(404, "Comment not found"));
  }
  if (comment.userId !== req.user.id && !req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to edit this comment"));
  }

  const editedComment = await Comment.findByIdAndUpdate(
    req.params.commentId,
    {
      content: req.body.content,
    },
    { new: true }
  );
  res.status(200).json(editedComment);
});

export const deleteComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) {
    return next(errorHandler(404, "Comment not found"));
  }
  if (comment.userId !== req.user.id && !req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not allowed to delete this comment")
    );
  }
  await Comment.findByIdAndDelete(req.params.commentId);
  res.status(200).json("Comment has been deleted");
});

export const getcomments = catchAsync(async (req, res, next) => {
  if (!req.user.isAdmin)
    return next(errorHandler(403, "You are not allowed to get all comments"));

  const startIndex = parseInt(req.query.startIndex) || 0;
  const limit = parseInt(req.query.limit) || 9;
  const sortDirection = req.query.sort === "desc" ? -1 : 1;
  const comments = await Comment.find()
    .sort({ createdAt: sortDirection })
    .skip(startIndex)
    .limit(limit);
  const totalComments = await Comment.countDocuments();
  const now = new Date();
  const oneMonthAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate()
  );
  const lastMonthComments = await Comment.countDocuments({
    createdAt: { $gte: oneMonthAgo },
  });
  res.status(200).json({ comments, totalComments, lastMonthComments });
});

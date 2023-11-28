/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const middleWare = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', ['name', 'username', '_id'])
    .populate('comments');
  response.json(blogs);
});

blogsRouter.get('/:id', async ({ params }, response) => {
  const blog = await Blog.findById(params.id)
    .populate('user', ['name', 'username', '_id'])
    .populate('comments');
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).json({ error: 'Blog not found' });
  }
});

blogsRouter.post('/', middleWare.userExtractor, async ({ user, body }, response) => {
  const blog = await new Blog({ ...body, user }).save();
  user.blogs.push(blog._id);
  await user.save();
  await blog.populate('user', ['name', 'username', '_id']);
  response.json(blog);
});

blogsRouter.post('/:id/comment', middleWare.userExtractor, async ({ user, body, params }, response) => {
  const blog = await Blog.findById({ _id: params.id });
  if (blog) {
    const comment = await new Comment({ ...body, creator: user._id }).save();
    blog.comments.push(comment._id);
    await blog.save();
    response.json(comment);
  } else {
    response.status(404).json({ error: 'Blog not found' });
  }
});

blogsRouter.delete('/:id', middleWare.userExtractor, async ({ params, user }, response) => {
  const blog = await Blog.findOneAndDelete(
    { _id: params.id, user: { _id: user._id } },
  );
  if (blog) {
    await Comment.deleteMany({ _id: { $in: blog.comments } });
    user.blogs.pull(blog);
    await user.save();
    response.status(204).end();
  } else {
    response.status(404).json({ error: 'Blog not found' });
  }
});

blogsRouter.put('/:id', async ({ params, body }, response) => {
  const blog = await Blog.findOneAndUpdate(
    { _id: params.id },
    { likes: body.likes },
    { runValidators: true, new: true },
  );
  if (blog) {
    await blog.populate('user', ['name', 'username', '_id']);
    response.status(200).json(blog);
  } else {
    response.status(404).json({ error: 'Blog not found' });
  }
});

module.exports = blogsRouter;

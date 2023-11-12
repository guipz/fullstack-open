/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const middleWare = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', ['name', 'username', '_id']);
  response.json(blogs);
});

blogsRouter.post('/', middleWare.userExtractor, async (request, response) => {
  const blog = await new Blog({ ...request.body, user: request.user }).save();
  response.json(blog);
});

blogsRouter.delete('/:id', middleWare.userExtractor, async (request, response) => {
  const blog = await Blog.findOneAndDelete(
    { _id: request.params.id, user: { _id: request.user._id } },
  );
  if (blog) {
    response.status(204).end();
  } else {
    response.status(404).json({ error: 'Blog not authenticated' });
  }
});

blogsRouter.put('/:id', middleWare.userExtractor, async (request, response) => {
  const blog = await Blog.findOneAndUpdate(
    { _id: request.params.id, user: { _id: request.user._id } },
    request.body,
    { runValidators: true, new: true },
  );
  if (blog) {
    response.status(200).json(blog);
  } else {
    response.status(404).json({ error: 'Blog not authenticated' });
  }
});

module.exports = blogsRouter;

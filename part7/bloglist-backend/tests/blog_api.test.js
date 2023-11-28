/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const blogTestHelper = require('./blog_test_helper');
const userTestHelper = require('./user_test_helper');

const api = supertest(app);

beforeEach(async () => {
  await blogTestHelper.testBlogsSetup();
});

describe('when there is initially some blogs saved', () => {
  test('all blogs are returned', async () => {
    const res = await api.get('/api/blogs');
    expect(res.body).toHaveLength(blogTestHelper.getLengthInitialBlogsAdded());
  });

  test('blogs are returned as json', async () => {
    const res = await api.get('/api/blogs');
    expect(res.headers['content-type']).toMatch(/application\/json/);
  });

  test('blogs identifier is named id', async () => {
    const res = await api.get('/api/blogs');
    res.body.forEach((b) => expect(b.id).not.toBe(undefined));
  });

  test('blogs contain user data', async () => {
    const res = await api.get('/api/blogs');
    res.body.forEach((b) => expect(typeof (b.user)).toBe(Object));
  });
});

describe('addition of blog', () => {
  test('succeeds if valid', async () => {
    const token = await userTestHelper.getRandomUserToken();
    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blogTestHelper.getRandomBlogCreationData());
    const amountBlogsAfter = await blogTestHelper.getLengthBlogsInDB();
    expect(amountBlogsAfter).toBe(blogTestHelper.getLengthInitialBlogsAdded() + 1);
  });

  test('without likes value defaults to zero', async () => {
    const token = await userTestHelper.getRandomUserToken();
    const noLikes = { ...blogTestHelper.getRandomBlogCreationData() };
    delete noLikes.likes;
    const res = await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(noLikes);
    expect(res.body.likes).toBe(0);
  });

  test('fails with code 400 if missing any required values', async () => {
    const token = await userTestHelper.getRandomUserToken();
    const missingValues = { ...blogTestHelper.getRandomBlogCreationData() };
    delete missingValues.title;
    delete missingValues.url;
    const res = await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(missingValues);
    expect(res.status).toBe(400);
  });
});

describe('deleting a blog', () => {
  test('succeeds if exist', async () => {
    const token = await userTestHelper.getRandomUserToken();
    const blog = await blogTestHelper.getRandomBlogDocument();
    const res = await api.delete(`/api/blogs/${blog.id}`)
      .set('Authorization', `Bearer ${token}`);
    const amountBlogsAfter = await blogTestHelper.getLengthBlogsInDB();
    expect(res.status).toBe(204);
    expect(amountBlogsAfter).toBe(blogTestHelper.getLengthInitialBlogsAdded() - 1);
  });

  test('fails if do not exist', async () => {
    const token = await userTestHelper.getRandomUserToken();
    const id = '654be0ba61a19dff9a5c878a';
    const res = await api.delete(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(404);
  });
});

describe('updating a blog', () => {
  test('succeeds if exist', async () => {
    const newTitle = 'New Title';
    const blog = await blogTestHelper.getRandomBlogDocument();
    const token = await blogTestHelper.getBlogUserToken(blog);
    await api.put(`/api/blogs/${blog.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: newTitle });
    const updatedBlog = await blogTestHelper.getBlogWithId(blog._id);
    expect(updatedBlog.title).toBe(newTitle);
  });

  test('fails if do not exist', async () => {
    const token = await userTestHelper.getRandomUserToken();
    const id = '654be0ba61a19dff9a5c878a';
    const res = await api.delete(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(404);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

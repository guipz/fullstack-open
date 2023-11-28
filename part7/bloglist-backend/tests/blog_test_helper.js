const Blog = require('../models/blog');
const userTestHelper = require('./user_test_helper');

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
];

const blogsInDB = async () => Blog.find({});

const getLengthInitialBlogsAdded = () => initialBlogs.length;

const getBlogWithId = async (id) => Blog.findById(id);

const getLengthBlogsInDB = async () => (await Blog.find({})).length;

const testBlogsSetup = async () => {
  await Blog.deleteMany({});
  await userTestHelper.testUsersSetup();
  const userId = await userTestHelper.getRandomUserId();
  const promisesArray = initialBlogs
    .map((b) => new Blog({ ...b, user: userId }))
    .map((b) => b.save());
  await Promise.all(promisesArray);
};

const getBlogUserToken = async (blog) => (await userTestHelper.getUserWithId(blog.user))
  .generateJWTToken();

const getRandomBlogCreationData = () => {
  const randIdx = Math.floor(Math.random() * initialBlogs.length);
  return initialBlogs[randIdx];
};

const getRandomBlogDocument = async () => Blog.findOne({});

module.exports = {
  initialBlogs,
  blogsInDB,
  testBlogsSetup,
  getRandomBlogDocument,
  getLengthBlogsInDB,
  getBlogWithId,
  getBlogUserToken,
  getRandomBlogCreationData,
  getLengthInitialBlogsAdded,
};

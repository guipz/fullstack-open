/* eslint-disable no-underscore-dangle */
const totalLikes = (blogs) => (blogs.length ? blogs.map((b) => b.likes)
  .reduce((p, c) => p + c) : 0);

const favoriteBlog = (blogs) => blogs.slice().sort((a, b) => b.likes - a.likes)[0];

const authorWithMostBlogs = (blogs) => {
  const authors = [];
  blogs.forEach((b) => {
    const author = authors.find((a) => a.author === b.author);
    if (author) {
      author.blogs += 1;
    } else {
      authors.push({ author: b.author, blogs: 1 });
    }
  });
  return authors.length > 0 ? authors.sort((a, b) => b.blogs - a.blogs)[0] : undefined;
};

const authorWithMostLikes = (blogs) => {
  const authors = [];
  blogs.forEach((b) => {
    const author = authors.find((a) => a.author === b.author);
    if (author) {
      author.likes += b.likes;
    } else {
      authors.push({ author: b.author, likes: b.likes });
    }
  });
  return authors.length > 0 ? authors.sort((a, b) => b.likes - a.likes)[0] : undefined;
};

module.exports = {
  totalLikes,
  favoriteBlog,
  authorWithMostBlogs,
  authorWithMostLikes,
};

const { GraphQLError } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const jwt = require("jsonwebtoken");

const Author = require("../models/author");
const Book = require("../models/book");
const User = require("../models/user");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async (_, args) => {
      const parameters = {};
      if (args.author) {
        parameters._id = { $in: [] };
        const author = await Author.findOne({ name: args.author });
        if (author) {
          const authorBooks = await Book.find({ author: author.id }, ["_id"]);
          parameters._id = { $in: authorBooks };
        }
      }
      if (args.genre) {
        parameters.genres = { $in: [args.genre] };
      }
      return Book.find(parameters);
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (_, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        try {
          author = await new Author({ name: args.author }).save();
        } catch (error) {
          throw new GraphQLError("Saving author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error,
            },
          });
        }
      }
      try {
        const book = await new Book({ ...args, author }).save();
        author.books.push(book);
        await author.save();
        pubsub.publish("BOOK_ADDED", { bookAdded: book });
        return book;
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }
    },
    editAuthor: async (_, args) => {
      const author = await Author.findOne({ name: args.name });
      if (author) {
        author.born = args.setBornTo;
        await author.save();
      }
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Author: {
    bookCount: (author) => author.books.length,
  },
  Book: {
    author: async (book) => Author.findOne({ _id: book.author }),
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;

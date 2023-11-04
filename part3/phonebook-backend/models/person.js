const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connecting to MongoDB:', error.message));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Must provide a name'],
    minLength: [3, 'Name must have at least 3 chars'],
    cast: 'The {PATH} must be a valid {KIND}',
    validate: {
      validator: (name) => mongoose.models.Person.exists({ name }, { collation: { locale: 'en', strength: 2 } }).then((r) => !r),
      message: (props) => `The name ${props.value} is already in use`,
    },
  },
  number: {
    type: String,
    trim: true,
    required: [true, 'Must provide a number'],
    minLength: [8, 'Number must have at least 8 chars'],
    match: [/^\d{2,3}-\d+$/, 'Must provide a valid number. Ex: 040-22334455, 09-1234556'],
    cast: 'The {PATH} must be a valid {KIND}',
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    returnedObject.id = returnedObject._id.toString();
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    delete returnedObject._id;
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);

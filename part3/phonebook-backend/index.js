require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');

const app = express();
app.use(express.json());
app.use(express.static('dist'));

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] :body - :response-time ms'));

const PORT = process.env.PORT || 3001;

const PERSON_NOT_FOUND_ERROR = { error: { name: 'PersonNotFound' } };
const getIdParamFromRequest = (request) => request.params.id;

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((r) => response.json(r))
    .catch((error) => next(error));
});

app.get('/info', (request, response, next) => {
  Person.find({})
    .then((r) => response.send(`<p>Phonebook has info for ${r.length} people.</p><p>${new Date()}</p>`))
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(getIdParamFromRequest(request))
    .then((r) => (r ? response.json(r) : next(PERSON_NOT_FOUND_ERROR)))
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.deleteOne({ _id: getIdParamFromRequest(request) })
    .then((r) => (r.deletedCount > 0 ? response.status(204).end() : next(PERSON_NOT_FOUND_ERROR)))
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const { body } = request;

  new Person({ name: body.name, number: body.number }).save()
    .then((r) => response.json(r))
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const id = getIdParamFromRequest(request);
  const { body } = request;

  Person.findOneAndUpdate({ _id: id }, { number: body.number }, { returnDocument: 'after', runValidators: true })
    .then((r) => (r ? response.json(r) : next(PERSON_NOT_FOUND_ERROR)))
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' });
};
app.use(unknownEndpoint);

const personNotFoundErrorHandler = (error, request, response, next) => {
  if (error.name === PERSON_NOT_FOUND_ERROR.name) {
    return response.status(404).send({ error: 'Person not found' });
  }
  return next(error);
};
app.use(personNotFoundErrorHandler);

const castErrorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformed request' });
  }
  return next(error);
};
app.use(castErrorHandler);

const validationErrorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: Object.values(error.errors).flatMap((e) => e.message).join(', ') });
  }
  return next(error);
};
app.use(validationErrorHandler);

const serverErrorHandler = (error, request, response) => response.status(500).send({ error: 'Server error' });
app.use(serverErrorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));

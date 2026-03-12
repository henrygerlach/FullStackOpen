require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person");

const app = express();

app.use(express.json());
app.use(express.static("dist"));

morgan.token("post-data", (request) => {
  return request.method === "POST" ? JSON.stringify(request.body) : "";
});

app.use(
  morgan(
    ":method :url :status :res[content-length] :response-time ms :post-data",
  ),
);

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  let error;
  Person.find({ name: body.name }).then((person) => {
    error = "name must be unique";
  });

  if (error) {
    return response.status(400).json({
      error: error,
    });
  }

  const person = Person({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then((person) => {
      response.json(person);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.find({ _id: id })
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then((value) => {
      if (value) {
        response.status(204).end();
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  console.log(id);

  Person.findOne({ _id: id })
    .then((person) => {
      const { name, number } = request.body;
      person.name = name;
      person.number = number;
      person
        .save()
        .then((person) => response.json(person))
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response) => {
  const now = Date().toString();
  Person.find({}).then((persons) => {
    response.send(
      `<div>Phonebook has info for ${persons.length} people</div><br><div>${now}</div>`,
    );
  });
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

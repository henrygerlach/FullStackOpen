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

app.post("/api/persons", (request, response) => {
  const body = request.body;

  let oldPerson;
  Person.find({ name: body.name }).then((person) => {
    oldPerson = person;
  });

  let error = null;
  if (!body.name) {
    error = "name missing";
  } else if (!body.number) {
    error = "number missing";
  } else if (oldPerson) {
    error = "name must be unique";
  }

  if (error) {
    console.log(error);
    return response.status(400).json({
      error: error,
    });
  }

  const person = Person({
    name: body.name,
    number: body.number,
  });
  person.save().then((person) => {
    response.json(person);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.find({ _id: id }).then((person) => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id).then((value) => {
    if (value) {
      response.status(204).end();
    } else {
      response.status(404).end();
    }
  });
});

app.get("/info", (request, response) => {
  const now = Date().toString();
  Person.find({}).then((persons) => {
    response.send(
      `<div>Phonebook has info for ${persons.length} people</div><br><div>${now}</div>`,
    );
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

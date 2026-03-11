require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect(process.env.mongodb_uri, { family: 4 });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = new mongoose.model("Person", personSchema);

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

const genID = () => {
  return String(Math.floor(Math.random() * 1000000));
};

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  const oldPerson = Person.find({ name: body.name });

  let error = null;
  if (!body.name) {
    error = "name missing";
  } else if (!body.number) {
    error = "number missing";
  } else if (oldPerson) {
    error = "name must be unique";
  }

  if (error) {
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
  const person = Person.find({ _id: id });

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id, (err, docs) => {
    if (err) {
      console.log(`error deleting ${id}: ${err}`);
      response.status(404).end();
    } else {
      response.status(204).end();
    }
  });
});

app.get("/info", (request, response) => {
  const now = Date().toString();
  Person.count({}, (err, count) => {
    if (err) {
      console.log(`error counting documents: ${err}`);
    } else {
      response.send(
        `<div>Phonebook has info for ${count} people</div><br><div>${now}</div>`,
      );
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const mongoose = require("mongoose");

if (process.argv.length !== 5) {
  console.log("Provide password, name and phone number as arguments");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://db_user:${password}@phonebook.zlosu7a.mongodb.net/phonebookApp?appName=Phonebook`;

mongoose.set("strictQuery", false);
mongoose.connect(url, { family: 4 });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = new mongoose.model("Person", personSchema);

const newPerson = new Person({
  name: name,
  number: number,
});

newPerson.save().then((result) => {
  console.log(`added ${name} ${number} to the phonebook`);
  Person.find({}).then((persons) => {
    console.log("Phonebook");
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
});

import { useState, useEffect } from "react";

import "./index.css";

import Filter from "./components/Filter";
import AddEntry from "./components/AddEntry";
import Numbers from "./components/Numbers";
import personsService from "./services/persons";

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  return <div className="notification">{notification}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personsService.getAll().then((data) => setPersons(data));
  }, []);

  const updateNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const handleEntrySubmit = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((person) => person.name === newName)) {
      if (
        confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        const oldPerson = persons.find((person) => person.name === newName);
        personsService.update({ ...newPerson, id: oldPerson.id });
        setPersons(
          persons.filter((person) => person.name !== newName).concat(newPerson),
        );
        updateNotification(`Updated ${newPerson.name}`);
      }
    } else {
      personsService.create(newPerson);
      setPersons(persons.concat(newPerson));
      updateNotification(`Added ${newPerson.name}`);
    }

    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (id) => {
    const deletePerson = persons.find((person) => person.id === id);

    setPersons(persons.filter((person) => person.id !== id));

    let error_occurred = False;
    personsService._delete(id).catch(() => {
      error_occurred = True;
      updateNotification(
        `Information for ${deletePerson.name} has already been removed from server`,
      );
    });

    if (!error_occurred) updateNotification(`Deleted ${deletePerson.name}`);
  };

  return (
    <div>
      <Notification notification={notification} />
      <Filter value={newFilter} handleChange={handleFilterChange} />
      <AddEntry
        name={newName}
        number={newNumber}
        handleEntrySubmit={handleEntrySubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <Numbers
        persons={persons}
        filter={newFilter}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;

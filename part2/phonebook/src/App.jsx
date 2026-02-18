import axios from 'axios'
import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import AddEntry from './components/AddEntry'
import Numbers from './components/Numbers'

import personsService from './services/persons' 


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personsService.getAll().then((data) => 
      setPersons(data)
    )
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleEntrySubmit = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newName)) {
      if (confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const oldPerson = persons.find(person => person.name === newName)
        personsService.update({...newPerson, id: oldPerson.id})
        setPersons(persons.filter(person => person.name !== newName).concat(newPerson))
      }
    } else {
      personsService.create(newPerson)
      setPersons(persons.concat(newPerson))
    }

    setNewName('')
    setNewNumber('')
  }

  const handleDelete = (( id ) => {
    setPersons(persons.filter(person => person.id !== id))
    personsService._delete(id)
  })  

  return (
    <div>
      <Filter value={newFilter} handleChange={handleFilterChange} />
      <AddEntry 
        name={newName} 
        number={newNumber} 
        handleEntrySubmit={handleEntrySubmit}
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
      />
      <Numbers persons={persons} filter={newFilter} handleDelete={handleDelete} />
    </div>
  )
}

export default App
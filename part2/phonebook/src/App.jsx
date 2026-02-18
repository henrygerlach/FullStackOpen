import axios from 'axios'
import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import AddEntry from './components/AddEntry'
import Numbers from './components/Numbers'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data)
      })
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
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already in the phonebook`)
    } else {
      setPersons(persons.concat({
        name: newName, 
        number: newNumber
      }))
      setNewName('')
      setNewNumber('')
    }
  }

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
      <Numbers persons={persons} filter={newFilter} />
    </div>
  )
}

export default App
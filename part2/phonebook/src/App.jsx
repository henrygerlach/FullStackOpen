import { useState } from 'react'
import Filter from './components/Filter'
import AddEntry from './components/AddEntry'
import Numbers from './components/Numbers'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
const Number = ({ id, name, number, handleDelete }) => {

  const handleClick = (name) => {
    if (confirm(`Delete ${name}?`)) {
      handleDelete(id)
    }
  }

  return (
    <div>
      {name} {number} <button onClick={() => handleClick(name)} >delete</button>
    </div>
  )
}


const Numbers = ({
  persons,
  filter,
  handleDelete
}) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons.filter(
        person => person.name.toLowerCase().includes(filter.toLowerCase())
      ).map(person => <Number 
        key={person.name}
        id={person.id}
        name={person.name} 
        number={person.number} 
        handleDelete={handleDelete}
        />)}
    </>
  )
}

export default Numbers
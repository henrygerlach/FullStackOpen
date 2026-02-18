const Number = ({ name, number }) => {
  return (
    <div>
      {name} {number}
    </div>
  )
}


const Numbers = ({
  persons,
  filter
}) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons.filter(
        person => person.name.toLowerCase().includes(filter.toLowerCase())
      ).map(person => <Number 
        key={person.name} 
        name={person.name} 
        number={person.number} 
        />)}
    </>
  )
}

export default Numbers
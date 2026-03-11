const Filter = ({ value, handleChange }) => {
  return (
    <>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with: <input value={value} onChange={handleChange} />
        </div>
      </form>
    </>
  )
}

export default Filter
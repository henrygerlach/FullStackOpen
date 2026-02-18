const AddEntry = ({ 
  name, 
  number, 
  handleEntrySubmit, 
  handleNameChange, 
  handleNumberChange 
}) => {
  return (
    <>
      <h2>add a new</h2>
      <form onSubmit={handleEntrySubmit}>
        <div>
          name: <input value={name} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={number} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default AddEntry
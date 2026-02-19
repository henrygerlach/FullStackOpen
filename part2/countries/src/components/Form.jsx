const Form = ({ text, filter, handleChange }) => {
  return (
    <div>
      <form>
        {text} <input name={text} value={filter} onChange={handleChange} />
      </form>
    </div>
  );
};

export default Form;

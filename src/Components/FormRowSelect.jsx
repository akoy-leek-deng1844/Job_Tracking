const FormRowSelect = ({name, value, list, labelText, handleChange}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        onChange={handleChange}
        value={value}
        className="form-select"
      >
        {list.map((item, index) => {
         return (
           <option value={item} key={index}>
             {item}
           </option>
         );
        })}
      </select>
    </div>
  );
}
export default FormRowSelect
const Input = ({ type, name, error, ...rest }) => {
  return (
    <div className="form-group">
      <br />
      <input
        className="form-control "
        {...rest}
        name={name}
        id={name}
        type={type}
      />
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default Input;

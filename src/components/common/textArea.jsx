const TextArea = ({ type, name, error, rows, ...rest }) => {
  return (
    <div className="form-group">
      <br />
      <textarea
        className="form-control"
        {...rest}
        name={name}
        id={name}
        type={type}
        rows={rows}
      />
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default TextArea;

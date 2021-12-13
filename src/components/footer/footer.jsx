const Footer = () => {
  function handelTop() {
    window.scrollTo(0, 0);
  }
  return (
    <p className="footer text-center pt-3">
      <button
        onClick={handelTop}
        style={{ backgroundColor: " rgb(66 28 92)" }}
        className="btn float-start ms-2 footer-btn"
      >
        <i className="bi bi-arrow-up text-white"></i>
      </button>
      <span style={{ color: " rgb(66 28 92)" }}>
        <span className="ms-1">&copy;</span>
        <span className="ms-1">{new Date().getFullYear()}</span>
        <span> Roi Lopez All rights reserved </span>
      </span>
    </p>
  );
};

export default Footer;

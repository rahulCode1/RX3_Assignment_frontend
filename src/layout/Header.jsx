import { NavLink } from "react-router";

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Student Management System
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item ">
                <NavLink
                  className="nav-link active text-decoration-none text-reset"
                  aria-current="page"
                  to="/"
                >
                  Students
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link text-decoration-none text-reset"
                  to="/classes"
                >
                  Classes
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link text-decoration-none text-reset"
                  to="/school"
                >
                  Schools
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link text-decoration-none text-reset"
                  to="/school/teachers"
                >
                  Teachers
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

import React from 'react';

const Header = (props) => {
  return (
    <nav className="navbar navbar-expand-sm">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#gd-navbar-content"
        aria-controls="gd-navbar-content"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="gd-navbar-content">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/"><i className="fas fa-home"></i></a>
          </li>
          <li className="nav-item ml-3">
            <button
              className="btn"
              type="button"
            ><i className="fas fa-broom gd-nav-btn-icon"></i></button>
          </li>
          <li className="nav-item ml-2">
            <button
              className="btn"
              type="button"
            ><i className="fas fa-copy gd-nav-btn-icon"></i></button>
          </li>
          <li className="nav-item ml-2">
            <button
              className="btn"
              type="button"
            ><i className="fas fa-font gd-nav-btn-icon"></i></button>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="/"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Utilities</a>
            <div className="dropdown-menu shadow" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/">Trim Spaces</a>
              <a className="dropdown-item" href="/">UPPER Case</a>
              {/* <div className="dropdown-divider"></div> */}
              <a className="dropdown-item" href="/">lower Case</a>
            </div>
          </li>
        </ul>
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </div>
    </nav>
  );
}

export default Header;
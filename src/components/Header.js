import React from 'react';
import { Link } from 'react-router-dom';
import { NoteContext } from '../context/NoteProvider';

const Header = () => {
  const {
    noteId,
    isEmpty,
    isSaved,
    navbarLocked,
    onNoteContentChange,
    onCopy,
    onSizeChange,
    onCaseChange,
    onTrimSpaces,
    toggleNavbarLock
  } = React.useContext(NoteContext);

  // Tries to toggle the navbar
  const collapseNavBar = () => {
    let elToggler = document.getElementsByClassName('navbar-toggler');
    let elBar = document.getElementById('gd-navbar-content');
    if (elBar.classList.contains('show')) {
      elToggler[0].click();
    }
    toggleNavbarLock();
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <a className="navbar-brand" href="/"><i className="fas fa-home"></i></a>
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
          <li className="nav-item ml-0 mt-2 ml-sm-2 mt-sm-0">
            <Link
              className={navbarLocked ? 'btn btn-outline-primary w-100 disabled' : 'btn btn-outline-primary w-100'}
              to="/open"
              role="button"
              onClick={collapseNavBar}
            ><i className="fas fa-folder-open gd-nav-btn-icon"></i><span
              className="pl-1 d-md-inline d-sm-none"
            >Open</span></Link>
          </li>
          <li className="nav-item ml-0 mt-2 ml-sm-2 mt-sm-0">
            <Link
              className={isSaved || navbarLocked ? 'btn btn-outline-primary w-100 disabled' : 'btn btn-outline-primary w-100'}
              to={noteId ? `/save/${noteId}` : '/save'}
              role="button"
              onClick={collapseNavBar}
            ><i className="fas fa-save gd-nav-btn-icon"></i><span
              className="pl-1 d-md-inline d-sm-none"
            >Save</span></Link>
          </li>
          <li className="nav-item ml-0 mt-2 ml-sm-2 mt-sm-0">
            <button
              className="btn btn-outline-primary w-100"
              type="button"
              disabled={isEmpty || navbarLocked}
              onClick={() => { onNoteContentChange('') }}
            ><i className="fas fa-broom gd-nav-btn-icon"></i><span
              className="pl-1 d-md-inline d-sm-none"
            >Clear</span></button>
          </li>
          <li className="nav-item ml-0 mt-2 ml-sm-2 mt-sm-0">
            <button
              className="btn btn-outline-primary w-100"
              type="button"
              disabled={isEmpty || navbarLocked}
              onClick={() => onCopy('gd-note')}
            ><i className="fas fa-copy gd-nav-btn-icon"></i><span
              className="pl-1 d-md-inline d-sm-none"
            >Copy</span></button>
          </li>
          <li className="nav-item ml-0 mt-2 ml-sm-2 mt-sm-0">
            <button
              className="btn btn-outline-primary w-100"
              type="button"
              disabled={isEmpty || navbarLocked}
              onClick={() => { onSizeChange('INCREASE') }}
            ><i className="fas fa-sort-alpha-up gd-nav-btn-icon"></i><span
              className="pl-1 d-md-inline d-sm-none"
            >Increase Font</span></button>
          </li>
          <li className="nav-item ml-0 mt-2 ml-sm-2 mt-sm-0">
            <button
              className="btn btn-outline-primary w-100"
              type="button"
              disabled={isEmpty || navbarLocked}
              onClick={() => { onSizeChange('DECREASE') }}
            ><i className="fas fa-sort-alpha-down gd-nav-btn-icon"></i><span
              className="pl-1 d-md-inline d-sm-none"
            >Decrease Font</span></button>
          </li>
          <li className="nav-item dropdown ml-0 mt-2 ml-sm-2 mt-sm-0">
            <button
              className="btn btn-outline-primary dropdown-toggle w-100"
              id="gd-dropdown-toolbox"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            ><i className="fas fa-toolbox gd-nav-btn-icon"></i><span
              className="pl-1 d-md-inline d-sm-none"
            >Tool Box</span></button>
            <div className="dropdown-menu shadow mt-2" aria-labelledby="gd-dropdown-toolbox">
              <button
                className="dropdown-item"
                type="button"
                disabled={isEmpty || navbarLocked}
                onClick={() => { onCaseChange('UPPER') }}
              >UPPER Case</button>
              <button
                className="dropdown-item"
                type="button"
                disabled={isEmpty || navbarLocked}
                onClick={() => { onCaseChange('LOWER') }}
              >lower Case</button>
              <div className="dropdown-divider"></div>
              <button
                className="dropdown-item"
                type="button"
                disabled={isEmpty || navbarLocked}
                onClick={onTrimSpaces}
              >Trim Spaces</button>
              <div className="dropdown-divider"></div>
              <Link
                className={navbarLocked ? 'dropdown-item disabled' : 'dropdown-item'}
                to="/download"
                role="button"
                onClick={collapseNavBar}
              >Download Notes</Link>
              <Link
                className={navbarLocked ? 'dropdown-item disabled' : 'dropdown-item'}
                to="/upload"
                role="button"
                onClick={collapseNavBar}
              >Upload Notes</Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
import React from 'react';
import { Link } from 'react-router-dom';
import md5 from 'md5';
import { NoteContext } from '../context/NoteProvider';
import { getLocalStorage, saveLocalStorage } from '../utilities/localstorage';
import { utoa } from '../utilities/base64';

const Header = () => {
  const {
    noteId,
    noteTitle,
    noteContent,
    isEmpty,
    isSaved,
    navbarLocked,
    onSetIsSaved,
    onNoteContentChange,
    onCopy,
    onCaseChange,
    onTrimSpaces,
    toggleNavbarLock
  } = React.useContext(NoteContext);

  /**
   * Tries to toggle the navbar
   * @param {any} ev Event object
   * @param {string} navbarState Set navbar state (lock or unlock)
   */
  const collapseNavBar = (ev, navbarState) => {
    const currentElement = ev.target.name || '';
    // console.log('Header: collapseNavBar.currentElement...', currentElement);
    let elToggler = document.getElementsByClassName('navbar-toggler');
    let elBar = document.getElementById('gd-navbar-content');
    if (elBar.classList.contains('show')) {
      elToggler[0].click();
    }
    // Set navbar state
    toggleNavbarLock(navbarState);
    // Upload button will clear current note
    if (currentElement === 'gd-navbar-upload' && noteId) onNoteContentChange('', md5(''));
  };

  const handleSave = (ev) => {
    let savedNotes = getLocalStorage('gd-notes', null, null);
    let tempNotes = [];
    savedNotes.data.forEach((v) => {
      // Update existing note
      if (noteId === v.noteId) {
        tempNotes.push({
          ...v,
          noteTitle: noteTitle,
          noteContent: utoa(noteContent),
          noteDate: new Date(),
          favourite: false
        })
      } else { tempNotes.push({ ...v }) }
    })
    // console.log('Save: notes.EDIT...', tempNotes);
    saveLocalStorage('gd-notes', tempNotes);
    onSetIsSaved(true);
    collapseNavBar(ev, 'unlock');
  };

  const handleClear = (ev) => {
    onNoteContentChange('', md5(''));
    collapseNavBar(ev, 'unlock');
  };

  const handleCopy = (ev) => {
    onCopy('gd-note');
    collapseNavBar(ev, 'unlock');
  };

  // console.log('Header: isSaved........', isSaved);
  // console.log('Header: navbarLocked...', navbarLocked);

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <a className="navbar-brand m-0" href="/"><i className="fas fa-home"></i></a>
      <span className="navbar-text p-0 ml-0 ml-sm-2 text-white gd-navbar-header">Quick Notes</span>
      <button
        className="navbar-toggler px-1"
        type="button"
        disabled={navbarLocked}
        data-toggle="collapse"
        data-target="#gd-navbar-content"
        aria-controls="gd-navbar-content"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="gd-navbar-content">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item ml-0 mt-2 ml-sm-2 mt-sm-0">
            <Link
              className={navbarLocked ? 'btn btn-outline-primary w-100 disabled' : 'btn btn-outline-primary w-100'}
              to="/open"
              role="button"
              onClick={(ev) => { collapseNavBar(ev, 'lock') }}
            ><i className="fas fa-folder-open gd-nav-btn-icon"></i><span
              className="pl-1 d-sm-none d-lg-inline"
            >Open</span></Link>
          </li>
          <li className="nav-item ml-0 mt-2 ml-sm-2 mt-sm-0">
            <button
              className={!(noteId) || isSaved || navbarLocked ? 'btn btn-outline-primary w-100 disabled' : 'btn btn-outline-info w-100'}
              type="button"
              disabled={!(noteId) || navbarLocked}
              onClick={handleSave}
            ><i className="fas fa-save gd-nav-btn-icon"></i><span
              className="pl-1 d-sm-none d-lg-inline"
            >Save</span></button>
          </li>
          <li className="nav-item ml-0 mt-2 ml-sm-2 mt-sm-0 gd-nav-btn-save-as">
            <Link
              className={isSaved || navbarLocked ? 'btn btn-outline-primary w-100 disabled' : 'btn btn-outline-info w-100'}
              to={noteId ? `/save/${noteId}` : '/save'}
              role="button"
              onClick={(ev) => { collapseNavBar(ev, 'lock') }}
            ><i className="far fa-save gd-nav-btn-icon"></i><span
              className="pl-1 d-sm-none d-lg-inline"
            >Save As</span></Link>
          </li>
          <li className="nav-item ml-0 mt-2 ml-sm-2 mt-sm-0">
            <button
              className="btn btn-outline-primary w-100"
              type="button"
              disabled={isEmpty || navbarLocked}
              onClick={handleCopy}
            ><i className="fas fa-copy gd-nav-btn-icon"></i><span
              className="pl-1 d-sm-none d-lg-inline"
            >Copy</span></button>
          </li>
          <li className="nav-item ml-0 mt-2 ml-sm-2 mt-sm-0">
            <button
              className="btn btn-outline-primary w-100"
              type="button"
              disabled={isEmpty || navbarLocked}
              onClick={handleClear}
            ><i className="fas fa-broom gd-nav-btn-icon"></i><span
              className="pl-1 d-sm-none d-lg-inline"
            >Clear</span></button>
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
              className="pl-1 d-sm-none d-lg-inline"
            >Tool Box</span></button>
            <div className="dropdown-menu dropdown-menu-right shadow mt-2" aria-labelledby="gd-dropdown-toolbox">
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
                onClick={(ev) => { collapseNavBar(ev, 'lock') }}
              >Download Notes</Link>
              <Link
                className={navbarLocked ? 'dropdown-item disabled' : 'dropdown-item'}
                to="/upload"
                role="button"
                name="gd-navbar-upload"
                onClick={(ev) => { collapseNavBar(ev, 'lock') }}
              >Upload Notes</Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
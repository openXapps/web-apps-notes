import React from 'react';
import Footer from './Footer';
import { NotesContext } from '../context/NotesProvider';

const Content = () => {
  const noteContext = React.useContext(NotesContext);

  const onChange = (e) => {
    noteContext.onNoteChange(e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="w-100 border gd-textarea">
        <textarea
          style={{ fontSize: noteContext.size }}
          className="w-100 h-100 border-0 p-2"
          defaultValue={noteContext.note}
          onChange={onChange}
        ></textarea>
      </div>
      <Footer text={noteContext.note} />
    </div>
  );
};

export default Content;
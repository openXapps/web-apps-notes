import React from 'react';
import Footer from './Footer';
import { NoteContext } from '../context/NoteProvider';

const Content = () => {
  const { noteTitle, noteContent, fontSize, onNoteContentChange } = React.useContext(NoteContext);

  return (
    <div className="container-fluid">
      <div className="h5">{noteTitle}</div>
      <div className="w-100 border gd-textarea">
        <textarea
          id='gd-note'
          style={{ fontSize: fontSize, backgroundColor: 'lightsteelblue' }}
          className="w-100 h-100 border-0 p-2 text-dark"
          placeholder="Start to type something..."
          value={noteContent}
          onChange={(e) => { onNoteContentChange(e.target.value) }}
        ></textarea>
      </div>
      <Footer noteLength={noteContent.length} fontSize={fontSize} />
    </div>
  );
};

export default Content;
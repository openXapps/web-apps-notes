import React from 'react';
import Footer from './Footer';
import { NoteContext } from '../context/NoteProvider';

const Content = () => {
  const { note, size, onNoteChange } = React.useContext(NoteContext);

  return (
    <div className="container-fluid">
      <div className="w-100 border gd-textarea">
        <textarea
          id='gd-note'
          style={{ fontSize: size, backgroundColor: 'lightsteelblue' }}
          className="w-100 h-100 border-0 p-2 text-dark"
          placeholder="Start to type something..."
          value={note}
          onChange={(e) => { onNoteChange(e.target.value) }}
        ></textarea>
      </div>
      <Footer noteLength={note.length} fontSize={size} />
    </div>
  );
};

export default Content;
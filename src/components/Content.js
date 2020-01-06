import React from 'react';
import Footer from './Footer';
import { NoteContext } from '../context/NoteProvider';

const Content = () => {
  const { noteTitle, noteContent, fontSize, onNoteContentChange } = React.useContext(NoteContext);
  const [lineWrapOn, setLineWrapOn] = React.useState(true);

  const onToggleLineWrap = () => {
    setLineWrapOn(!lineWrapOn);
  }

  return (
    <div className="container-fluid">
      <div className="h5">{noteTitle}</div>
      <div className="w-100 border gd-textarea">
        <textarea
          id='gd-note'
          style={lineWrapOn ? ({
            fontSize: fontSize,
            backgroundColor: 'lightsteelblue'
          }) : ({
            fontSize: fontSize,
            backgroundColor: 'lightsteelblue',
            whiteSpace: 'pre',
            overflowWrap: 'normal',
            overflowX: 'auto'
          })}
          className="w-100 h-100 border-0 p-2 text-dark"
          placeholder="Start to type something..."
          value={noteContent}
          onChange={(e) => { onNoteContentChange(e.target.value) }}
        ></textarea>
      </div>
      <Footer
        noteLength={noteContent.length}
        fontSize={fontSize}
        lineWrapOn={lineWrapOn}
        onToggleLineWrap={onToggleLineWrap}
      />
    </div>
  );
};

export default Content;
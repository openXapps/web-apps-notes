import React from 'react';
import Footer from './Footer';
import { NoteContext } from '../context/NoteProvider';
import { getLocalStorage, saveLocalStorage } from '../utilities/localstorage';

/**
 * Helper function to get config from local storage
 * @returns An object containing current config
 */
const noteConfig = () => {
  const config = getLocalStorage('gd-notes-config');
  return config.statusOK ? config.data : {
    fontSize: (config.data.fontSize ? config.data.fontSize : 24),
    lineWrapOn: true };
};

const Content = () => {
  const { noteTitle, noteContent, onNoteContentChange } = React.useContext(NoteContext);
  const [fontSize, setFontSize] = React.useState(noteConfig().fontSize || 24);
  const [lineWrapOn, setLineWrapOn] = React.useState(noteConfig().lineWrapOn);

  const onFontSizeChange = (action) => {
    let payload = fontSize;
    if (action === 'INCREASE' && fontSize < 60) payload = fontSize + 4;
    if (action === 'DECREASE' && fontSize > 12) payload = fontSize - 4;
    setFontSize(payload)
    saveLocalStorage('gd-notes-config', { ...noteConfig(), fontSize: payload });
  };

  const onToggleLineWrap = () => {
    setLineWrapOn(!lineWrapOn);
    saveLocalStorage('gd-notes-config', { ...noteConfig(), lineWrapOn: !lineWrapOn });
  }

  // console.log('Content: noteConfig...', noteConfig());

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
        onFontSizeChange={onFontSizeChange}
      />
    </div>
  );
};

export default Content;
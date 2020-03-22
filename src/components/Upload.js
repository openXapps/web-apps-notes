import React from 'react';
import { useHistory } from 'react-router-dom';
import uuidv1 from 'uuid/v1';
import { NoteContext } from '../context/NoteProvider';
import { getLocalStorage, saveLocalStorage } from '../utilities/localstorage';

const buttonClass = {
    mute: 'btn btn-outline-light',
    action: 'btn btn-outline-info',
    success: 'btn btn-outline-success',
    error: 'btn btn-outline-warning'
};
const overwriteButtonDefault = { label: 'Overwrite All Notes', isDisabled: true };
const appendButtonDefault = { label: 'Append To Existing Notes', isDisabled: true };
const notesValidator = (notes) => {
    let response = { isValid: false, notes: [] };
    try {
        response.notes = JSON.parse(notes);
        // console.log('Upload: response.notes...', response.notes);
        // Check if data is an Array
        if (Array.isArray(response.notes)) {
            // Ckeck if Array has data
            if (response.notes.length > 0) {
                // Check if valid notesContent object
                response.isValid = response.notes[0].noteId ? true : false;
                response.isValid = response.notes[0].noteTitle && response.isValid ? true : false;
                response.isValid = response.notes[0].noteContent && response.isValid ? true : false;
                response.isValid = response.notes[0].noteDate && response.isValid ? true : false;
                // response.isValid = response.notes[0].favourite ? true : false;
            }
        } else {
            throw new Error('Not an array');
        }
    } catch (err) {
        // Poop! Not a valid JSON string or an Array object
        // console.log('Upload: validation err..........', err);
        response.isValid = false;
    }
    return response;
};

const Upload = () => {
    const routerHistory = useHistory();
    const [notesContent, setNotesContent] = React.useState('');
    const [overwriteButton, setOverwriteButton] = React.useState(overwriteButtonDefault);
    const [appendButton, setAppendButton] = React.useState(appendButtonDefault);
    const textArea = React.useRef();
    const { toggleNavbarLock } = React.useContext(NoteContext);

    React.useEffect(() => {
        textArea.current.focus();
        // Clean up effect
        return () => {
            // Restore navbar state
            toggleNavbarLock('unlock');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleNotesChange = (ev) => {
        if (ev.target.value && (overwriteButton.isDisabled || appendButton.isDisabled)) {
            setOverwriteButton({ label: overwriteButtonDefault.label, isDisabled: false });
            setAppendButton({ label: appendButtonDefault.label, isDisabled: false });
        }
        setNotesContent(ev.target.value);
    };

    const handleOverwrite = () => {
        const validation = notesValidator(notesContent);
        if (validation.isValid) {
            saveLocalStorage('gd-notes', validation.notes);
            setOverwriteButton({ label: 'SAVED', isDisabled: true });
        } else {
            setOverwriteButton({ label: 'ERROR', isDisabled: true });
        }
        setAppendButton({ label: appendButtonDefault.label, isDisabled: true });
    };

    const handleAppend = () => {
        const validation = notesValidator(notesContent);
        // console.log('Upload: handleAppend.validation...', validation);
        const storedNotes = getLocalStorage('gd-notes').data;
        let tempNotes = [];
        if (validation.isValid) {
            // Regenerate all note IDs to prevent duplication
            tempNotes = validation.notes.map((v, i) => {
                return { ...v, noteId: uuidv1() };
            });
            // console.log('Upload: handleAppend.tempNotes...', tempNotes);
            saveLocalStorage('gd-notes', storedNotes.concat(tempNotes));
            setAppendButton({ label: 'SAVED', isDisabled: true });
        } else {
            setAppendButton({ label: 'ERROR', isDisabled: true });
        }
        setOverwriteButton({ label: overwriteButton.label, isDisabled: true });
    };

    return (
        <div className="container">
            <div className="border border-primary rounded-lg my-2 p-3">
                <h5 className="mb-2">Upload Notes</h5>
                {overwriteButton.label === 'ERROR' || appendButton.label === 'ERROR' ? (
                    <p className="text-warning">Your upload content failed validation!</p>) : (
                        overwriteButton.label === 'SAVED' || appendButton.label === 'SAVED' ? (
                            <p>Your upload is complete!</p>) : (<p>Paste notes and click Overwrite or Append</p>)
                    )}
                <textarea
                    className="text-monospace text-muted w-100 mb-2 rounded-lg border-0 gd-textarea-upload"
                    ref={textArea}
                    value={notesContent}
                    onChange={handleNotesChange}
                ></textarea>
                <div className="d-flex">
                    <div className="">
                        <button
                            className={overwriteButton.label === 'ERROR' ? (buttonClass.error) : (
                                overwriteButton.label === 'SAVED' ? (buttonClass.success) : (
                                    overwriteButton.isDisabled ? (buttonClass.mute) : (buttonClass.action)
                                ))}
                            type="button"
                            disabled={overwriteButton.isDisabled}
                            onClick={handleOverwrite}
                        >{overwriteButton.label}</button>
                    </div>
                    <div className="ml-2">
                        <button
                            className={appendButton.label === 'ERROR' ? (buttonClass.error) : (
                                appendButton.label === 'SAVED' ? (buttonClass.success) : (
                                    appendButton.isDisabled ? (buttonClass.mute) : (buttonClass.action)
                                ))}
                            type="button"
                            disabled={appendButton.isDisabled}
                            onClick={handleAppend}
                        >{appendButton.label}</button>
                    </div>
                    <div className="ml-2">
                        <button
                            className="btn btn-outline-light"
                            type="button"
                            onClick={() => { routerHistory.goBack(); }}
                        >Back</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;
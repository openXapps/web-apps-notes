import React from 'react';
import { useHistory } from 'react-router-dom';
import uuidv1 from 'uuid/v1';
import { NoteContext } from '../context/NoteProvider';
import { getLocalStorage, saveLocalStorage } from '../utilities/localstorage';

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
                response.isValid = response.notes[0].noteTitle ? true : false;
                response.isValid = response.notes[0].noteContent ? true : false;
                response.isValid = response.notes[0].noteDate ? true : false;
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
    const [isSaved, setIsSaved] = React.useState(false);
    const [notesContent, setNotesContent] = React.useState('');
    const [overwriteButton, setOverwriteButton] = React.useState(overwriteButtonDefault);
    const [appendButton, setAppendButton] = React.useState(appendButtonDefault);
    const textArea = React.useRef();
    const { toggleNavbarLock } = React.useContext(NoteContext);

    React.useEffect(() => {
        textArea.current.focus();
        return () => {
            toggleNavbarLock();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleNotesChange = (e) => {
        if (e.target.value && (overwriteButton.isDisabled || appendButton.isDisabled)) {
            setOverwriteButton({ label: overwriteButtonDefault.label, isDisabled: false });
            setAppendButton({ label: appendButtonDefault.label, isDisabled: false });
            setIsSaved(false);
        }
        setNotesContent(e.target.value);
    };

    const handleOverwrite = () => {
        const validation = notesValidator(notesContent);
        if (validation.isValid) {
            saveLocalStorage('gd-notes', validation.notes);
            setOverwriteButton({ label: 'SAVED', isDisabled: true });
            setIsSaved(true);
        } else {
            setOverwriteButton({ label: 'ERROR', isDisabled: true });
            setIsSaved(false);
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
            setIsSaved(true);
        } else {
            setAppendButton({ label: 'ERROR', isDisabled: true });
            setIsSaved(false);
        }
        setOverwriteButton({ label: overwriteButton.label, isDisabled: true });
    };

    return (
        <div className="container">
            <div className="border border-primary rounded-lg my-2 p-3">
                <h5 className="mb-2">Upload Notes</h5>
                {!isSaved ? (<p>Paste notes and click Overwrite or Append</p>) : (<p>Your upload is complete!</p>)}
                <textarea
                    className="text-monospace text-muted w-100 mb-2 gd-textarea-upload"
                    ref={textArea}
                    value={notesContent}
                    onChange={handleNotesChange}
                ></textarea>
                <button
                    className={overwriteButton.label === 'ERROR' ? ('btn btn-outline-info') : ('btn btn-outline-light')}
                    type="button"
                    disabled={overwriteButton.isDisabled}
                    onClick={handleOverwrite}
                >{overwriteButton.label}</button>
                <button
                    className={appendButton.label === 'ERROR' ? ('btn btn-outline-info ml-2') : ('btn btn-outline-light ml-2')}
                    type="button"
                    disabled={appendButton.isDisabled}
                    onClick={handleAppend}
                >{appendButton.label}</button>
                <button
                    className="btn btn-outline-light ml-2"
                    type="button"
                    onClick={() => { routerHistory.goBack(); }}
                >Back</button>
            </div>
        </div>
    );
};

export default Upload;
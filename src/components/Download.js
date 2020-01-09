import React from 'react';
import { useHistory } from 'react-router-dom';
import { NoteContext } from '../context/NoteProvider';

/**
 * Helper function to reformat the note list
 * @param {string} popMe String to pop
 */
const stringPop = (popMe) => {
    let popped = '';
    if (popMe) {
        popped = popMe.replace('[', '[\n');
        popped = popped.replace(']', '\n]');
        popped = popped.replace(/},{/g, '},\n{');
    }
    return popped;
};

const copyButtonDefault = { label: 'Copy', isDisabled: true };

const Download = () => {
    const routerHistory = useHistory();
    const [isLoading, setIsLoading] = React.useState(true);
    const [notes, setNotes] = React.useState('');
    const [copyButton, setCopyButton] = React.useState(copyButtonDefault);
    const { toggleNavbarLock } = React.useContext(NoteContext);

    React.useEffect(() => {
        const tempNotes = stringPop(localStorage.getItem('gd-notes'));
        if (tempNotes) {
            setTimeout(() => {
                setNotes(tempNotes);
                setIsLoading(false);
                setCopyButton({ ...copyButtonDefault, isDisabled: false });
            }, 1000);
        }
        return () => {
            toggleNavbarLock();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCopy = () => {
        /* Get text field element ref */
        let copyText = document.getElementById('gd-note-to-copy');
        /* Select text in field */
        copyText.select();
        /* Copy selected text */
        document.execCommand('copy');
        setCopyButton({ label: 'COPIED', isDisabled: true });
    };

    return (
        <div className="container">
            <div className="border border-primary rounded-lg my-2 p-3">
                <h5 className="mb-2">Download Notes</h5>
                {isLoading ? (<p>Loading...</p>) : (<p>Copy content to a text file</p>)}
                <textarea
                    className="text-monospace text-muted w-100 mb-2 gd-textarea-download"
                    defaultValue={notes}
                    id="gd-note-to-copy"
                ></textarea>
                <button
                    className="btn btn-outline-light"
                    type="button"
                    disabled={copyButton.isDisabled}
                    onClick={handleCopy}
                >{copyButton.label}</button>
                <button
                    className="btn btn-outline-light ml-2"
                    type="button"
                    onClick={() => { routerHistory.goBack(); }}
                >Back</button>
            </div>
        </div>
    );
};

export default Download;
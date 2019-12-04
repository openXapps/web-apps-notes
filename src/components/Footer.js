import React from 'react';

const Footer = (props) => {
    return (
        <div className="fixed-bottom">
            <div className="d-flex flex-row justify-content-between bg-primary text-dark">
                <div className="p-1 small text-white">length {props.text.length}</div>
                <div className="p-1 small text-white">length {props.text.length}</div>
            </div>
        </div>
    );
};

export default Footer;
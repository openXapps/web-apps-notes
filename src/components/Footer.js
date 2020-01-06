import React from 'react';

const Footer = ({ noteLength, fontSize, lineWrapOn, onToggleLineWrap }) => {
  // console.log('Footer: lineWrapOn...', lineWrapOn);
  return (
    <div className="fixed-bottom">
      <div className="d-flex flex-row justify-content-between align-items-center bg-secondary">
        <div className="d-flex flex-row align-items-center">
          <div className="p-1 small text-white">note length {noteLength}</div>
          <div className="ml-2 my-1">
            <button
              className="btn btn-outline-primary btn-sm"
              type="button"
              onClick={onToggleLineWrap}
            >line wrap is {lineWrapOn ? 'on' : 'off'}</button>
          </div>
        </div>
        <div className="p-1 small text-white">font size {fontSize}</div>
      </div>
    </div>
  );
};

export default Footer;
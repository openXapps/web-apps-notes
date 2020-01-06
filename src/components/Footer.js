import React from 'react';

const Value = ({ v }) => {
  return (
    <span className="text-info"><strong>{v}</strong></span>
  );
}

const Footer = ({ noteLength, fontSize, lineWrapOn, onToggleLineWrap }) => {
  // console.log('Footer: lineWrapOn...', lineWrapOn);
  return (
    <div className="fixed-bottom">
      <div className="d-flex flex-row justify-content-between align-items-center bg-secondary">
        <div className="m-1">
          <button
            className="btn btn-outline-primary btn-sm"
            type="button"
            onClick={onToggleLineWrap}
          >line wrap is {lineWrapOn ? 'on' : 'off'}</button>
        </div>
        <div className="d-flex flex-row align-items-center">
          <div className="p-1 small text-white">note length <Value v={noteLength} /></div>
          <div className="p-1 small text-white">font size <Value v={fontSize} /></div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
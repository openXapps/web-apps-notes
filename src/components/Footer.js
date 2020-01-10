import React from 'react';

const Value = ({ v }) => {
  return (
    <span className="text-info"><strong>{v}</strong></span>
  );
}

const Footer = (props) => {
  // console.log('Footer: lineWrapOn...', lineWrapOn);
  return (
    <div className="fixed-bottom">
      <div className="d-flex flex-row justify-content-between align-items-center bg-secondary">
        <div className="m-1">
          <button
            className="btn btn-outline-primary btn-sm"
            type="button"
            onClick={props.onToggleLineWrap}
          >line wrap is {props.lineWrapOn ? 'on' : 'off'}</button>
          <button
            className="btn btn-outline-primary btn-sm ml-2"
            type="button"
            onClick={() => { props.onFontSizeChange('INCREASE') }}
          ><i className="fas fa-search-plus gd-nav-btn-icon"></i><span
            className="pl-1 d-none d-sm-inline"
          >Zoom In</span></button>
          <button
            className="btn btn-outline-primary btn-sm ml-2"
            type="button"
            onClick={() => { props.onFontSizeChange('DECREASE') }}
          ><i className="fas fa-search-minus gd-nav-btn-icon"></i><span
            className="pl-1 d-none d-sm-inline"
          >Zoom Out</span></button>
        </div>
        <div className="d-flex flex-row align-items-center">
          <div className="p-1 small text-white">note length <Value v={props.noteLength} /></div>
          <div className="p-1 small text-white d-none d-sm-inline">font size <Value v={props.fontSize} /></div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
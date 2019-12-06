import React from 'react';

const Footer = (props) => {
  return (
    <div className="fixed-bottom">
      <div className="d-flex flex-row justify-content-between bg-secondary text-dark">
        <div className="p-1 small text-white">note length {props.text.length}</div>
        <div className="p-1 small text-white">font size {props.size}</div>
      </div>
    </div>
  );
};

export default Footer;
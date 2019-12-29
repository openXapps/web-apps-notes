import React from 'react';

const Footer = ({ noteLength, fontSize }) => {
  return (
    <div className="fixed-bottom">
      <div className="d-flex flex-row justify-content-between bg-secondary text-dark">
        <div className="p-1 small text-white">note length {noteLength}</div>
        <div className="p-1 small text-white">font size {fontSize}</div>
      </div>
    </div>
  );
};

export default Footer;
import React from 'react';

const Content = () => {
  const [text, setText] = React.useState('Hello World');

  const onTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="mt-3 w-100 border" style={{ height: '85vh' }}>
        <textarea
          style={{ resize: "vertica" }}
          className="w-100 h-100 border-0 p-2"
          defaultValue={text}
          onChange={onTextChange}
        ></textarea>
      </div>
      <div className="fixed-bottom border">
        <div className="d-flex flex-row justify-content-between bg-primary text-dark">
          <div className="p-2">length {text.length}</div>
          <div className="p-2">length {text.length}</div>
          <div className="p-2">length {text.length}</div>
        </div>
      </div>
    </div>
  );
};

export default Content;
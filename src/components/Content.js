import React from 'react';
import Footer from './Footer';

const Content = () => {
  const [text, setText] = React.useState('Hello World');

  const onTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="mt-3 w-100 border" style={{ height: '82vh' }}>
        <textarea
          style={{ resize: "vertica" }}
          className="w-100 h-100 border-0 p-2"
          defaultValue={text}
          onChange={onTextChange}
        ></textarea>
      </div>
      <Footer text={text} />
    </div>
  );
};

export default Content;
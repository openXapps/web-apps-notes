import React from 'react';
import Footer from './Footer';

const Content = () => {
  const [text, setText] = React.useState('Hello World');

  const onTextChange = (e) => {
    setText(e.target.value);
  };
  //  style={{ height: '85vh' }}
  return (
    <div className="container-fluid">
      <div className="w-100 border gd-textarea">
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
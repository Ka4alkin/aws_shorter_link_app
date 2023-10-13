import React from 'react';

const Btn = ({handler, content, colorSchema}) => {
  colorSchema = colorSchema ? colorSchema : 'gray';
  return (

    <button
      className={`py-2 px-4 bg-${colorSchema}-500 text-white rounded-md hover:bg-${colorSchema}-600`}
      onClick={handler}
    >
      {content}
    </button>

  );
};

export default Btn;

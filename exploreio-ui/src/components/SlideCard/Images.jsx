import React from 'react';

function Images({ text, imageUrl }) {
  return (
    <div className="image-container">
      <img src={imageUrl} alt={text} />
      <div className="image-text">{text}</div>
    </div>
  );
}

export default Images;

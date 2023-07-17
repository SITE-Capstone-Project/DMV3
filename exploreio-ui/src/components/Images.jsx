import React from 'react';

function Images({ text, imageUrl }) {
  return (
    <div style={{ height: '300px', background: '#ccc' }}>
      <img
        src={imageUrl}
        alt={text}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
}

export default Images;

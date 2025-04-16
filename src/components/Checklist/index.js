import React from 'react';

export default function Checklist({ children }) {
  return (
    <div className="checklist">
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {children}
      </ul>
    </div>
  );
}


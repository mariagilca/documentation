import React, { useState } from 'react';

export default function ChecklistItem({ title, children }) {
  const [isChecked, setIsChecked] = useState(false);
  
  return (
    <li style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          style={{ marginRight: '0.5rem', marginTop: '0.25rem' }}
        />
        <div>
          <strong style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>
            {title}
          </strong>
          <div style={{ marginLeft: '1.5rem' }}>
            {children}
          </div>
        </div>
      </label>
    </li>
  );
}
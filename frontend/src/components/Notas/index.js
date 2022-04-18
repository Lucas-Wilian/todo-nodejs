import React from 'react';

export const Notas = ({ data }) => {
  return (
    <li className='notepad-infos'>
      <div>
        <strong>{data.title}</strong>
        <div>x</div>
      </div>
      <textarea defaultValue={data.notes} />
      <span>!</span>
    </li>
  );
};

import React, { useState } from 'react';
import { AiTwotoneDelete, AiOutlineExclamationCircle } from 'react-icons/ai';
import api from '../../service/api';
import './style.css';
import './styles-priority.css';

export const Notas = ({ data, handleChangePriority, handleDelete }) => {
  const [changeNote, setChangeNote] = useState('');

  async function handleSave(e, notes) {
    e.style.cursor = 'default';
    e.style.boxShadow = 'none';
    if (changeNote && changeNote !== notes) {
      await api.post(`/contents/${data._id}`, {
        notes: changeNote,
      });
    }
  }

  function handleEdit(e, priority) {
    e.style.cursor = 'text';
    e.style.borderRadius = '5px';
    if (priority) {
      e.style.boxShadow = '0 0 5px white';
    } else {
      e.style.boxShadow = '0 0 5px gray';
    }
  }

  return (
    <li className={data.priority ? 'notepad-infos-priority' : 'notepad-infos'}>
      <div>
        <strong>{data.title}</strong>
        <span>
          <AiTwotoneDelete size='20' onClick={() => handleDelete(data._id)} />
        </span>
      </div>
      <textarea
        onClick={(e) => handleEdit(e.target, data.priority)}
        onChange={(e) => setChangeNote(e.target.value)}
        defaultValue={data.notes}
        onBlur={(e) => handleSave(e.target, data.notes)}
      />
      <span>
        <AiOutlineExclamationCircle
          size='20'
          onClick={() => handleChangePriority(data._id)}
        />
      </span>
    </li>
  );
};

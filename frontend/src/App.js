import React, { useState, useEffect } from 'react';

import './global.css';
import './sidebar.css';
import './app.css';
import './main.css';
import { Notas } from './components/Notas/index';
import api from './service/api';
import { RadioButton } from './components/RadioButton';

function App() {
  const [title, setTitles] = useState('');
  const [notes, setNotes] = useState('');
  const [allNotes, setAllNotes] = useState([]);
  const [selectedValue, setSelectedValue] = useState('all');

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await api.post('/annotations', {
      title,
      notes,
      priority: false,
    });
    setNotes('');
    setTitles('');
    if (selectedValue !== 'all') {
      getAllNotes();
    } else {
      setAllNotes([...allNotes, response.data]);
    }
    setSelectedValue('all');
  }

  async function handleDelete(id) {
    const deleteNote = await api.delete(`/annotations/${id}`);

    if (deleteNote) {
      setAllNotes(allNotes.filter((note) => note._id !== id));
    }
  }

  async function handleChangePriority(id) {
    const note = await api.post(`/priorities/${id}`);
    if (note && selectedValue !== 'all') {
      loadNotes(selectedValue);
    } else if (note) {
      getAllNotes();
    }
  }

  async function getAllNotes() {
    const response = await api.get('/annotations');
    setAllNotes(response.data);
  }

  async function loadNotes(option) {
    const params = { priority: option };
    const response = await api.get('/priorities', { params });
    if (response) {
      setAllNotes(response.data);
    }
  }

  function handleChange(e) {
    setSelectedValue(e.value);
    if (e.checked && e.value !== 'all') {
      loadNotes(e.value);
    } else {
      getAllNotes();
    }
  }

  useEffect(() => {
    getAllNotes();
  }, []);

  useEffect(() => {
    function enableSubmitButton() {
      let btn = document.getElementById('btn_submit');
      btn.style.background = '#ffd3ca';
      if (title && notes) {
        btn.style.background = '#eb8f7a';
      }
    }
    enableSubmitButton();
  }, [title, notes]);

  return (
    <div id='app'>
      <aside>
        <strong>Bloco de Notas</strong>
        <form onSubmit={handleSubmit}>
          <div className='input-block'>
            <label>Titulo da Anotação</label>
            <input
              required
              maxLength='30'
              value={title}
              onChange={(e) => setTitles(e.target.value)}
            />
          </div>
          <div className='input-block'>
            <label>Anotação</label>
            <textarea
              required
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <button id='btn_submit' type='submit'>
            Salvar
          </button>
        </form>
        <RadioButton
          selectedValue={selectedValue}
          handleChange={handleChange}
        />
      </aside>
      <main>
        <ul>
          {allNotes.map((data, index) => (
            <Notas
              data={data}
              key={index}
              handleChangePriority={handleChangePriority}
              handleDelete={handleDelete}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;

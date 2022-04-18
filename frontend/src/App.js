import React, { useState, useEffect } from 'react';

import './global.css';
import './sidebar.css';
import './app.css';
import './main.css';
import { Notas } from './components/Notas/index';
import api from './service/api';

function App() {
  const [title, setTitles] = useState('');
  const [notes, setNotes] = useState('');
  const [allNotes, setAllNotes] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await api.post('/annotations', {
      title,
      notes,
      priority: false,
    });
    setNotes('');
    setTitles('');

    setAllNotes([...allNotes, response.data]);
  }

  useEffect(() => {
    async function getAllNotes() {
      const response = await api.get('/annotations');
      setAllNotes(response.data);
    }
    getAllNotes();
  }, []);

  return (
    <div id='app'>
      <aside>
        <strong>Bloco de Notas</strong>
        <form onSubmit={handleSubmit}>
          <div className='input-block'>
            <label>Titulo da Anotação</label>
            <input
              required
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
          <button type='submit'>Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          {allNotes.map((data, index) => (
            <Notas data={data} key={index} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;

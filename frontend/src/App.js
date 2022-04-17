import React from 'react';
import './global.css';
import './sidebar.css';
import './app.css';
import './main.css';
import { Notas } from './components/Notas/index';

function App() {
  return (
    <div id='app'>
      <aside>
        <strong>Bloco de Notas</strong>
        <form>
          <div className='input-block'>
            <label>Titulo da Anotação</label>
            <input />
          </div>
          <div className='input-block'>
            <label>Anotação</label>
            <textarea />
          </div>
          <button type='submit'>Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          <Notas />
          <Notas />
          <Notas />
          <Notas />
          <Notas />
        </ul>
      </main>
    </div>
  );
}

export default App;

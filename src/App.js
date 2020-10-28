import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repos, setRepos] = useState([]);

  async function handleAddRepository() {
    const res = await api.post('/repositories', {
      title: `Repository-${Date.now()}`,
      url: `https://github.com/luizwhite/repo-${Date.now()}`,
      techs: ['Node.js', 'ReactJS', 'React Native'],
    });

    const repo = res.data;

    setRepos([...repos, repo]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepos(repos.filter((repo) => repo.id !== id));
  }

  useEffect(() => {
    api.get('/repositories').then((res) => {
      setRepos(res.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid='repository-list'>
        {repos.map((repo) => (
          <div key={repo.id}>
            <li>{repo.title}</li>
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </div>
        ))}
      </ul>

      <button onClick={() => handleAddRepository()}>Adicionar</button>
    </div>
  );
}

export default App;

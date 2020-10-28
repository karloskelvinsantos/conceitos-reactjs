import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('/repositories');
  
      setRepositories(response.data);
    }

    fetchData();
    
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('/repositories', {
      id: '123456',
      url: 'https://github.com/karloskelvinsantos/desafio-conceitos-nodejs',
      title: 'Dasafio Conceitos Nodejs',
      techs: ['javacript', 'node']
      });
    
    setRepositories([...repositories, response.data]);        
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`/repositories/${id}`);
    const newRepositories = repositories.filter(repo => repo.id !== id);
    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

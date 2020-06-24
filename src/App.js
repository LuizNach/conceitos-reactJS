import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [ repositories, setRepositories ] = useState( [] );

  async function handleAddRepository() {
    
    const response = await api.post('repositories', {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });

    const repository = response.data;

    setRepositories( [...repositories, repository] );

  }

  async function handleRemoveRepository(id) {
    
    const response = await api.delete(`repositories/${id.toString()}`);

    if ( response.status === 204) {
      const new_repositories = repositories.slice( repository =>  repository.id === id);

      setRepositories(new_repositories);
    }

  }

  useEffect( () => {
    api.get('repositories').then( response => { setRepositories(response.data); });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map( repository => {
          return (<li key={repository.id}>
            {repository.title ? repository.title : ""}

            <button onClick={() => handleRemoveRepository( repository.id )}>
              Remover
            </button>
          </li>)
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

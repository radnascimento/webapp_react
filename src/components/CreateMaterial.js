import React, { useState } from 'react';
import MaterialService from '../services/MaterialService';

const CreateMaterial = () => {
  const [url, setUrl] = useState('');
  const [idTopic, setIdTopic] = useState('');
  const [idLevel, setIdLevel] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMaterial = {
      idTopic,
      idLevel,
      url
    };

    MaterialService.createMaterial(newMaterial)
      .then(response => {
        setMessage('Material created successfully!');
        setUrl('');
        setIdTopic('');
        setIdLevel('');
      })
      .catch(error => {
        setMessage('Error creating material. Please try again.');
        console.error('Error creating material', error);
      });
  };

  return (
    <div>
      <h1>Create Material</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>URL</label>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} required />
        </div>
        <div>
          <label>Topic ID</label>
          <input type="text" value={idTopic} onChange={(e) => setIdTopic(e.target.value)} required />
        </div>
        <div>
          <label>Level ID</label>
          <input type="text" value={idLevel} onChange={(e) => setIdLevel(e.target.value)} required />
        </div>
        <button type="submit">Create Material</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
};

export default CreateMaterial;

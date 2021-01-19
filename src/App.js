import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  // const [person, setPerson] = useState('');
  const [people, setPeople] = useState('');

  useEffect(async () => {
    const persons = await axios.get('http://localhost:3001/names');
    setPeople(persons.data);
  }, []);

  // eslint-disable-next-line
  console.log('people :>> ', people);

  return (
    <div>
      hello world
    </div>
  );
};

export default App;

/* eslint react/prop-types: 0 */
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Run the json server : npx json-server --port=3001 --watch names.json

const RenderPerson = ({ person }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.amount}</td>
  </tr>
);

const App = () => {
  const [people, setPeople] = useState([]);

  useEffect(async () => {
    const persons = await axios.get('http://localhost:3001/names');
    setPeople(persons.data);
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>NAME</th>
          <th>NUMBER</th>
        </tr>
      </thead>
      <tbody>
        { people.map((person) => <RenderPerson key={person.name} person={person} />)}
      </tbody>
    </table>
  );
};

export default App;

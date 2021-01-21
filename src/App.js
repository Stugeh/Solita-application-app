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
  const [search, setSearch] = useState('');

  const filteredPeople = search === '' ? people
    : people.filter(
      (person) => person.name.toLowerCase().includes(search.toLowerCase()),
    );

  useEffect(async () => {
    const persons = await axios.get('http://localhost:3001/names');
    setPeople(Object.values(persons.data));
  }, []);

  const sortByName = () => {
    const newPeople = [...people.sort((a, b) => ((a.name > b.name) ? 1 : -1))];
    setPeople(newPeople);
  };

  const sortByAmount = () => {
    people.sort((a, b) => ((a.name < b.name) ? 1 : -1));
    const newPeople = [...people.sort((a, b) => ((a.amount < b.amount) ? 1 : -1))];
    setPeople(newPeople);
  };

  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      Search:
      <input value={search} onChange={searchHandler} />
      <button onClick={sortByName} type="submit">
        Sort by name
      </button>
      <button onClick={sortByAmount} type="submit">
        Sort by amount
      </button>
      <table>
        <thead>
          <tr>
            <th>NAME</th>
            <th>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          { filteredPeople.map((person) => <RenderPerson key={person.name} person={person} />)}
        </tbody>
      </table>
      <h3>
        Names in the list:
        {` ${people.length}`}
      </h3>
    </div>
  );
};

export default App;

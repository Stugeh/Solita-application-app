/* eslint react/prop-types: 0 */
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Run the json-server: npx json-server --port=3001 --watch names.json

// renders a row with persons name and amount into a table.
const RenderPerson = ({ person }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.amount}</td>
  </tr>
);

const App = () => {
  // The list of people fetched from the json server gets
  // stored in "people" as an array of objects.
  // "search" tracks searchbox state.
  const [people, setPeople] = useState([]);
  const [search, setSearch] = useState('');

  // array of people that contains the results of the search
  const filteredPeople = search === '' ? people
    : people.filter(
      (person) => person.name.toLowerCase().includes(search.toLowerCase()),
    );

  // Effect hook to get list of names from json server.
  useEffect(async () => {
    const persons = await axios.get('http://localhost:3001/names');
    setPeople(persons.data);
  }, []);

  const sortByName = () => {
    const newPeople = [...people.sort((a, b) => ((a.name > b.name) ? 1 : -1))];
    setPeople(newPeople);
  };

  // First sorts alphabetically before sorting by amount.
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

      <h1> Name Application </h1>

      Search:
      <input value={search} onChange={searchHandler} type="text" />

      <h4>
        Names in the list:
        {` ${people.length}`}
        <br />
        Names that match search:
        {` ${filteredPeople.length}`}
      </h4>

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
          {filteredPeople.map(
            (person) => <RenderPerson key={person.name} person={person} />,
          )}
        </tbody>
      </table>

    </div>
  );
};

export default App;

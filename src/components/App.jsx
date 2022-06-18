import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import Section from './Section';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import contactsList from '../contacts.json';

function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? contactsList
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  // const [contacts, setContacts] = useLocalStorage('contactList', []);
  // const [filter, setFilter] = useState('');

  // function useLocalStorage(key, defaultValue) {
  //   const [state, setState] = useState(
  //     () => JSON.parse(window.localStorage.getItem(key)) ?? defaultValue
  //   );

  //   useEffect(() => {
  //     window.localStorage.setItem(key, JSON.stringify(state));
  //   }, [key, state]);
  //   return [state, setState];
  // }
  const formSubmit = ({ name, number }) => {
    const isContact = contacts.find(contact => contact.name === name);
    if (isContact) {
      alert(`${name} is already in contact`);
    } else {
      setContacts(state => {
        const newContact = {
          id: nanoid(),
          name,
          number,
        };
        return [newContact, ...state];
      });
    }
  };

  const contactDelete = id => {
    setContacts(state => state.filter(contact => contact.id !== id));
  };

  const handleFilterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const filteredContacts = value => {
    const filterNormalize = value.toLowerCase();

    return contacts
      .filter(contact => contact.name.toLowerCase().includes(filterNormalize))
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  const contactList = filteredContacts(filter);

  return (
    <>
      <Section>
        <ContactForm onSubmit={formSubmit} />
        <h2>Contacts</h2>
        <Filter
          title="Find contact by name"
          onChange={handleFilterChange}
          value={filter}
        />
        <ContactList onDelete={contactDelete} filteredContacts={contactList} />
      </Section>
    </>
  );
}

export default App;

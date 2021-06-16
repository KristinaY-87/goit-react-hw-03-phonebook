import './App.css';
import { Component } from 'react';
import ContactList from './component/ContactList/ContactList';
import ContactForm from './component/ContactForm/ContactForm';
import Filter from './component/Filter/Filter';
import Section from './component/Section/Section';
import contacts from './contacts.json';
import { v4 as uuidv4 } from 'uuid';

class App extends Component {
  state = {
    contacts: contacts,
    filter: '',
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;

    const contact = {
      name: name,
      number: number,
      id: uuidv4(),
    };
    contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase(),
    )
      ? alert(`${name} is already in contacts`)
      : contacts.some(({ number }) => number === contact.number)
      ? alert(`${number} is already in contacts`)
      : this.setState(({ contacts }) => ({ contacts: [contact, ...contacts] }));
  };

  deleteContacts = ContactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== ContactId),
    }));
  };

  formSubmitHandler = data => {
    console.log(data);
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.number.includes(filter),
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    // console.log(contacts);
    const parseContacts = JSON.parse(contacts);

    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevState) {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      console.log('update');
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.addContact} />

          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList
            contacts={visibleContacts}
            onDeleteContacts={this.deleteContacts}
          />
        </Section>
      </>
    );
  }
}

export default App;

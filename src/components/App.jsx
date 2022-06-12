import React, { useEffect, useState } from "react";
import Filter from "./Filter/Filter";
import Form from "./Form/Form";
import shortid from "shortid";
import ContactList from "./ContactList/ContactList";
// class App extends Component {
//   state = {
//     contacts: [{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],

export default function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const deleteContact = (ContactId) => {
    console.log(ContactId)
    setContacts(prevContact =>
      prevContact.filter(contact => contact.id !== ContactId))
  }


  const formSubmitHandler = ({ name, number }) => {

    const newName = {
      id: shortid.generate(),
      name,
      number,

    }
    //   filter: ''

    // deleteContact = (ContactId) => {
    //   this.setState(prevState => ({
    //     contacts: prevState.contacts.filter(contact => contact.id !== ContactId)
    //   }))
    // }

    // formSubmitHandler = ({ name, number }) => {

    //   const newName = {
    //     id: shortid.generate(),
    //     name,
    //     number,

    //   }

    const findinList = contacts.find(
      ({ name }) =>
        newName.name.toLocaleLowerCase() === name.toLocaleLowerCase(),
    );

    if (findinList) {
      alert(`${findinList.name} is alredy in contact`);
      return;
    }

    setContacts([newName, ...contacts])



    // setState(prevState => ({

    //   contacts: [newName, ...prevState.contacts],


  }
  const changeFilter = e => {
    setFilter(e.currentTarget.value)
  }

  const getVisibleContact = e => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter));
  }


  // changeFilter = e => {
  //   this.setState({ filter: e.currentTarget.value })
  // }
  // getVisibleContact = () => {
  //   const { filter, contacts } = this.state;
  //   const normalizedFilter = filter.toLowerCase();
  //   return contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(normalizedFilter));
  // }
  // componentDidMount() {

  //   const contacts = localStorage.getItem('contacts');
  //   const parsedContacts = JSON.parse(contacts)
  //   console.log(contacts)
  //   console.log(parsedContacts)
  //   if (parsedContacts) {
  //     this.setState({ contacts: parsedContacts })
  //   }

  // }
  // componentDidUpdate(prevState) {

  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem("contacts", JSON.stringify(this.state.contacts))

  //   }

  // }
  // render() {
  //   const { filter } = this.state;
  //   // console.log(this.state.contacts) ; 




  const visibleContact = getVisibleContact();

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    setContacts(parsedContacts);
  }, [])

  useEffect(() => {
    if (contacts !== setContacts) {
      localStorage.setItem("contacts", JSON.stringify(contacts))
    }
  }, [contacts])

  return (
    <div>


      <Form onFormSubmit={formSubmitHandler} />
      <Filter value={filter} onChangeFilter={changeFilter} />
      <ContactList contacts={visibleContact} onDeleteContact={deleteContact} />

    </div>
  )
}



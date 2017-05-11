
/* eslint-disable max-len*/
import React, { Component } from 'react';
import ContactList from './ContactList';
import SearchBar from './SearchBar';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchText: '',
      contacts: [],
    };
  }
  componentDidMount() {
    axios.get('http://localhost:4000/contacts')
     .then(resp => {
       this.setState({
         searchText: this.state.searchText,
         contacts: resp.data
       });
     })
     .catch(err => console.log(`Error! ${err}`));
  }
  handleSearchBarChange(event) {
    this.setState({
      searchText: event.target.value
    });
  }
  getFilteredContacts() {
    const term = this.state.searchText.trim().toLowerCase();
    const filteredContacts = this.state.contacts.filter( contact => {
      return contact.name.toLowerCase().indexOf(term) >= 0;
    });

    return filteredContacts;
  }

  render() {

    return (
      <div className="App">
        <h1>Contact List</h1>
        <SearchBar onChange={this.handleSearchBarChange.bind(this)} value={this.state.searchText} />
        <ContactList contacts={this.getFilteredContacts()} />
      </div>
    );
  }
}

export default App;

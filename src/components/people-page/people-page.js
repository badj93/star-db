import React, { Component } from 'react'
import Row from '../row/row'
import './people-page.css'
import ItemList from "../item-list/item-list";
import ItemDetails from "../item-details/item-details";
import SwapiService from "../../services/swapi-service";

export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: 3,
    hasError: false
  };

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true
    });
  };

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    })
  };

  render() {

    const itemList = (
      <ItemList
        onItemSelected={ this.onPersonSelected }
        getData={this.swapiService.getAllPeople}
        renderItem={({ name, gender, birthYear }) => `${name} (${gender}, ${birthYear}`}
      />
    );

    const personDetails = (
      <ItemDetails personId={ this.state.selectedPerson }/>
    );

    if (this.state.hasError) {
      return <h1>Error</h1>;
    }

    return (
      <Row left={ itemList } right={ personDetails }/>
    )
  }
};

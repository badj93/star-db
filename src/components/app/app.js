import React, { Component } from 'react'
import Header from '../../components/header/header'
import RandomPlanet from '../../components/random-planet/random-planet'
import './app.css'
import SwapiService from "../../services/swapi-service";
import Row from '../../components/row/row'

import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
  PersonList,
  PlanetList,
  StarshipList
} from "../sw-components";

export default class App extends Component{

  componentDidCatch(error, errorInfo) {
    this.setState({hasError: true})
  }

  render() {
    const personList = (
      <>
        <PersonList
          renderItem={(item) => item.name}
          onItemSelected={ this.onPersonSelected }
        />
      </>
    );

    const personDetails = (
      <PersonDetails itemId={11}/>
    );

    return (
      <div className='stardb-app'>
        <Header/>
        <RandomPlanet/>
        <Row left={ personList } right={ personDetails }/>
      </div>
    )
  }
};

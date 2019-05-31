import React, { Component } from 'react'
import Header from '../../components/header/header'
import RandomPlanet from '../../components/random-planet/random-planet'
import { SwapiSeviceProvider } from "../../services/swapi-service-context";
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

const swapiService = new SwapiService();


export default class App extends Component{

  componentDidCatch(error, errorInfo) {
    this.setState({hasError: true})
  }

  render() {

    const personDetails = (
      <PersonDetails itemId={11}/>
    );

    return (
      <SwapiSeviceProvider value={ swapiService }>
        <div className='stardb-app'>
          <Header/>
          <RandomPlanet/>
          <Row left={ <PersonList/> } right={ personDetails }/>
          <Row left={ <StarshipList/> } right={ personDetails }/>
        </div>
      </SwapiSeviceProvider>
    )
  }
};

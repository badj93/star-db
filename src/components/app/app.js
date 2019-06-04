import React, { Component } from 'react'
import Header from '../../components/header/header'
import RandomPlanet from '../../components/random-planet/random-planet'
import { SwapiSeviceProvider } from "../../services/swapi-service-context";
import './app.css'
import SwapiService from "../../services/swapi-service";
import PeoplePage from "../pages/people-page";
import PlanetsPage from "../pages/planets-page";
import LoginPage from '../pages/login-page'
import SecretPage from '../pages/secret-page'
import StarshipsPage from "../pages/starships-page";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import StarshipDetails from "../sw-components/starship-details";

const swapiService = new SwapiService();

export default class App extends Component{

  state = {
    isLoggedIn: false
  };

  onLoggin = () => {
    this.setState({
      isLoggedIn: true
    })
  };

  componentDidCatch(error, errorInfo) {
    this.setState({hasError: true})
  }

  render() {
    const { isLoggedIn } = this.state;
    return (
      <SwapiSeviceProvider value={ swapiService }>
        <Router>
          <div className='stardb-app'>
            <Header/>
            <RandomPlanet />
            <Switch>
              <Route path='/' exact render={() => <h2>Welcome to StarDB</h2>}/>
              <Route path='/people/:id?' component={ PeoplePage }/>
              <Route path='/planets' component={ PlanetsPage }/>
              <Route path='/starships' exact component={ StarshipsPage }/>
              <Route path='/starships/:id' render={({match}) => {
                const { id } = match.params;
                return <StarshipDetails itemId={ id }/>
              }}/>
              <Route
                path='/login'
                render={() => (
                  <LoginPage isLoggedIn={ isLoggedIn } onLogin={this.onLoggin}/>
                )}
              />
              <Route
                path='/secret'
                render={() => (
                  <SecretPage isLoggedIn={ isLoggedIn }/>
                )}
              />
              <Route render={() => (<h2>Page not found</h2>)} />
            </Switch>
          </div>
        </Router>
      </SwapiSeviceProvider>
    )
  }
};

import React, { Component } from 'react'
import SwapiSerive from '../../services/swapi-service'
import ErrorIndicator from '../error-indicator/error-indicator'
import Spinner from '../spinner/spinner'
import PropTypes from 'prop-types'

import './random-planet.css'

export default class RandomPlanets extends Component {

  swapiServise = new SwapiSerive();

  static propTypes = {
    updateInterval: PropTypes.number
  };

  state = {
    planet: {},
    loading: true,
    error: false
  };

  componentWillMount() {
    const { updateInterval } = this.props;
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, updateInterval);
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false
    });
  };

  onError = (error) => {
    this.setState({
      error: true,
      loading: false
    });
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 25 + 2);

    this.swapiServise
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  };

  render() {

    const { planet, loading, error } = this.state;

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = hasData ? <PlanetView planet={ planet }/> : null;

    return (
        <div className='random-planet jumbotron rounded'>
          { errorMessage }
          { spinner }
          { content }
        </div>
    );
  }
}

RandomPlanets.defaultProps = {
  updateInterval: 10000
};

const PlanetView = ({ planet }) => {

  const { population, rotationPeriod, diameter, name, id } = planet;

  return (
    <>
      <img className='planet-image'
           src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt='random planets'/>
      <div>
        <h4>{ name }</h4>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>
            <span className='term'>Population</span>
            <span> { population }</span>
          </li>
          <li className='list-group-item'>
            <span className='term'>Rotation Period</span>
            <span> { rotationPeriod }</span>
          </li>
          <li className='list-group-item'>
            <span className='term'>Diameter</span>
            <span> { diameter }</span>
          </li>
        </ul>
      </div>
    </>
  );
};

import React from 'react'
import ItemList from '../item-list/item-list'
import withData from '../hoc-helper/with-data'
import withSwapiService from "../hoc-helper/with-swapi-service";
import compose from '../hoc-helper/compose'

const withChildFunction = (fn) => (Wrapped) => {
  return (props) => {
    return (
      <Wrapped { ...props }>
        { fn }
      </Wrapped>
    );
  }
};

const mapPersonMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPeople
  }
};

const mapPlanetsMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPlanets
  }
};

const mapStarshipsMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllStarships
  }
};

const renderName = ({ name }) => <span>{ name }</span>;
const renderModelAndName = ({ model, name}) => <span>{ name } ({ model })</span>;

const PersonList = compose(
                    withSwapiService(mapPersonMethodsToProps),
                      withData,
                      withChildFunction(renderName)
                    )(ItemList);

const PlanetList = compose(
                    withSwapiService(mapPlanetsMethodsToProps),
                      withData,
                      withChildFunction(renderName)
                    )(ItemList);

const StarshipList = compose(
                      withSwapiService(mapStarshipsMethodsToProps),
                        withData,
                        withChildFunction(renderModelAndName)
                      )(ItemList);

export {
  PersonList,
  PlanetList,
  StarshipList
};

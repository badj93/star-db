import React from 'react'
import Row from "../row/row";
import { PersonList } from "../sw-components";
import PersonDetails from "../sw-components/person-details";
import { withRouter } from 'react-router-dom'

const PeoplePage = ({ history, match }) => {
  return (
    <Row left={ <PersonList onItemSelected={(id) => history.push(id)} /> } right={ <PersonDetails itemId={ match.params.id }/> }/>
  );
};

export default withRouter(PeoplePage);

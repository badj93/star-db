import React, { Component } from 'react'
import './item-details.css'
import Spinner from "../spinner/spinner";

const Record = ({ item, field, label }) => {
  return (
    <li className='list-group-item'>
      <span className='term'>{ label }</span>
      <span>{ item[field] }</span>
    </li>
  );
};

export {
  Record
};

export default class ItemDetails extends Component {

  state = {
    item: null,
    loading: true,
    image: null
  };

  componentDidMount() {
    this.updatePerson();
  };

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.setState({
        loading: true
      });
      this.updatePerson();
    }
  };

  updatePerson() {
    const { itemId, getData, getImageUrl } = this.props;

    if (!itemId) {
      return;
    }

    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          loading: false,
          image: getImageUrl(item)
        });
      });
  };

  render() {
    if (!this.state.item) {
      return <span>Select a person from a list</span>
    }

    const { loading, item } = this.state;

    const mapChild = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { item })
    });

    const content = !loading ? <PersonView person={ item } image={ this.state.image } children={ mapChild }/> : null;
    const spinner = loading ? <Spinner/> : null;

    return (
      <div className='person-details card'>
        { content }
        { spinner }
      </div>
    );
  }
}

const PersonView = ({ person, image, children }) => {

  const { name } = person;

  return (
    <>
      <img className='person-image'
           src={ image }
           alt="character"/>
      <div className='card-body'>
        <h4>{ name }</h4>
        <ul className='list-group list-group-flush'>
          { children }
        </ul>
      </div>
    </>
  );
};

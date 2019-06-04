import React, { Component } from 'react';

import Spinner from '../spinner/spinner';

const withData = (View) => {
  return class extends Component {

    state = {
      data: null,
      loading: true
    };

    componentDidUpdate(prevProps) {
      if (this.props.getData !== prevProps.getData) {
        this.update();
      }
    }

    componentDidMount() {
      this.update();
    }

    update() {
      this.setState({
        loading: true
      });

      this.props.getData()
        .then((data) => {
          this.setState({
            data,
            loading: false
          });
        });
    }


    render() {
      const { data, loading } = this.state;

      if (loading) {
        return <Spinner />;
      }

      return <View {...this.props} data={data} />;
    }
  };
};

export default withData;

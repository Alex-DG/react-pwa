import React, { Component, PropTypes } from 'react';

const propTypes = {

};

const defaultProps = {

};

class GameProducts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        Text from GameProducts
      </div>
    );
  }
}

GameProducts.propTypes = propTypes;
GameProducts.defaultProps = defaultProps;

export default GameProducts;

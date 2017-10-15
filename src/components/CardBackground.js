/**
 * Created by Sergey on 15.10.2017.
 */

import React, { PropTypes, Component } from 'react';

export default class CardBackground extends Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <img
        style={{ width: '100%', height: '100%' }}
        src={`https://placem.at/things?w=250&h=300&random=1&t=${Math.random() * 10000}`}
      />
    );
  }
}

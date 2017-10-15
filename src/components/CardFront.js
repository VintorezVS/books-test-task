/**
 * Created by Sergey on 15.10.2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridTile } from 'material-ui/GridList';
import CardBackground from './CardBackground';
import { Dialog, FlatButton, IconButton } from 'material-ui';
import { ActionDelete } from 'material-ui/svg-icons';
import { white } from 'material-ui/styles/colors';

export default class CardFront extends Component {
  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    actionIcon: PropTypes.element,
    onDelete: PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      isModalOpened: false
    };
  }

  handleCancelClick = () => {
    this.setState({ isModalOpened: false });
  };

  handleDeleteClick = () => {
    this.setState({ isModalOpened: true });
  };

  handleDelete = () => {
    this.handleCancelClick();
    this.props.onDelete();
  };

  render() {
    const { onDelete, ...otherProps } = this.props;
    return (
      <GridTile {...otherProps}>
        <div className="delete">
          <IconButton onClick={this.handleDeleteClick}>
            <ActionDelete color={white} />
          </IconButton>
        </div>
        <CardBackground />
        <Dialog
          actions={[
            <FlatButton
              label="Cancel"
              onClick={this.handleCancelClick}
              primary
            />,
            <FlatButton
              label="Delete"
              onClick={this.handleDelete}
              secondary
            />
          ]}
          open={this.state.isModalOpened}
          modal
        >
          Do you want to delete the book "{this.props.title}"?
        </Dialog>
      </GridTile>
    );
  }
}

/**
 * Created by Sergey on 15.10.2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardBack from './CardBack';
import CardFront from './CardFront';
import { IconButton } from 'material-ui';
import { ImageEdit } from 'material-ui/svg-icons';

export default class BookCard extends Component {
  static propTypes = {
    title: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.object,
    isEdited: PropTypes.bool,
    index: PropTypes.number,
    onToggleEditClick: PropTypes.func,
    onSave: PropTypes.func,
    onDelete: PropTypes.func
  };

  handleEditClick = () => {
    this.props.onToggleEditClick(this.props.index);
  };

  handleSave = (book) => {
    this.props.onSave(this.props.index, book);
  };

  handleCancelClick = () => {
    this.props.onToggleEditClick();
  };

  handleDelete = () => {
    this.props.onDelete(this.props.index);
  };

  render() {
    const { title, author, date, isEdited } = this.props;
    return (
      <div className="flip-container">
        <div className="flipper" style={{
          transform: isEdited && 'rotateY(180deg)' || 'rotateY(0)',
          boxShadow: isEdited && '-3px 3px 3px 0 rgba(0, 0, 0, 0.4)' || '3px 3px 3px 0 rgba(0, 0, 0, 0.4)'
        }}>
          <div className="front">
            <CardFront
              title={title}
              subtitle={`${date.toLocaleDateString()} - ${author}`}
              actionIcon={<IconButton onClick={this.handleEditClick}><ImageEdit color="white"/></IconButton>}
              onDelete={this.handleDelete}
            />
          </div>
          <div className="back">
            <CardBack
              title={title}
              author={author}
              date={date}
              onSave={this.handleSave}
              onCancelClick={this.handleCancelClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

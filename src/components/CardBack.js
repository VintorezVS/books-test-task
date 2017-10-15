/**
 * Created by Sergey on 15.10.2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DatePicker, IconButton, TextField } from 'material-ui';
import { ActionDone, ContentClear } from 'material-ui/svg-icons';
import { green500, red500 } from 'material-ui/styles/colors';

export default class CardBack extends Component {
  static propTypes = {
    title: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.object,
    onSave: PropTypes.func,
    onCancelClick: PropTypes.func
  };

  constructor(props) {
    super();
    this.initialState = this.getInitialState(props);
    this.state = this.initialState;

    this.handleTitleChange = this.handleChange.bind(this, 'title');
    this.handleAuthorChange = this.handleChange.bind(this, 'author');
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.initialState = this.getInitialState(nextProps);
  }

  getInitialState = (props) => ({
    title: {
      value: props.title,
      error: ''
    },
    author: {
      value: props.author,
      error: ''
    },
    date: props.date
  });

  handleChange = (field, event, value) => {
    let error = '';
    if (!value) {
      error = `${field[0].toUpperCase()}${field.slice(1)} is required`;
    }
    this.setState({ [field]: { value, error } });
  };

  handleDateChange = (event, date) => {
    this.setState({ date: date });
  };

  handleSaveClick = () => {
    const { title, author, date } = this.state;
    if (!title.error && !author.error) {
      this.props.onSave({ title: title.value, author: author.value, date });
      this.props.onCancelClick();
    }
  };

  handleCancelClick = () => {
    this.setState(this.initialState);
    this.props.onCancelClick();
  };

  formatDate = (date) => date.toLocaleDateString();

  render() {
    const { title, author, date } = this.state;
    return (
      <div className="form">
        <TextField
          value={title.value}
          errorText={title.error}
          floatingLabelText="Title"
          onChange={this.handleTitleChange}
          fullWidth
        />
        <TextField
          value={author.value}
          errorText={author.error}
          floatingLabelText="Author"
          onChange={this.handleAuthorChange}
          fullWidth
        />
        <DatePicker
          value={date}
          floatingLabelText="Date"
          onChange={this.handleDateChange}
          formatDate={this.formatDate}
          fullWidth
          autoOk
        />
        <div className="actions">
          <IconButton
            tooltip="Cancel"
            tooltipPosition="top-center"
            onClick={this.handleCancelClick}
          >
            <ContentClear color={red500} />
          </IconButton>
          <IconButton
            tooltip="Save"
            tooltipPosition="top-center"
            onClick={this.handleSaveClick}
          >
            <ActionDone color={green500} />
          </IconButton>
        </div>
      </div>
    );
  }
}

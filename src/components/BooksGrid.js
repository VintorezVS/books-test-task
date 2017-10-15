/**
 * Created by Sergey on 14.10.2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridList } from 'material-ui/GridList';
import BookCard from './BookCard';
import { bookPropType } from '../constants/index';

export default class BooksGrid extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(bookPropType),
    onSave: PropTypes.func,
    onDelete: PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      editedBookIndex: null
    };

    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.forceUpdate();
    }, 100);
  };

  handleToggleEditClick = (index = null) => {
    this.setState({ editedBookIndex: index });
  };

  render() {
    const books = this.props.books;
    return (
      <GridList
        cellHeight={325}
        padding={10}
        cols={Math.floor(Math.min(1400, window.innerWidth - 20) / 250)}
        style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}
      >
        {books && books.map((book, index) => <BookCard
          {...book}
          isEdited={index === this.state.editedBookIndex}
          index={index}
          key={index}
          onToggleEditClick={this.handleToggleEditClick}
          onSave={this.props.onSave}
          onDelete={this.props.onDelete}
        />)}
      </GridList>
    );
  }
}

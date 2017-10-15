import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { getBooks } from '../selectors/index';
import Loading from '../components/Loading';
import BooksGrid from '../components/BooksGrid';
import { deleteBook, getBooksRequest, saveBook } from '../actions/index';
import { bookPropType } from '../constants/index';

class App extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(bookPropType),
    loading: PropTypes.bool,
    getBooksRequest: PropTypes.func,
    saveBook: PropTypes.func,
    deleteBook: PropTypes.func
  };

  componentDidMount() {
    this.props.getBooksRequest();
  }

  render() {
    const { books, saveBook, deleteBook } = this.props;
    return (
      <div>
        <AppBar title="Books" showMenuIconButton={false}/>
        {this.props.loading
        && <Loading/>
        || <BooksGrid books={books} onSave={saveBook} onDelete={deleteBook} />}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    books: getBooks(state),
    loading: state.loading
  }),
  { getBooksRequest, saveBook, deleteBook }
)(App);

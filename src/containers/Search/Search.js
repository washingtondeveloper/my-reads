import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BookList from '../../components/BookList/BookList';
import * as actionSearch from '../../store/actions/search/searchAction';

/**
 * @description Responsavel em pesquisar livros, para adicionar na estante
 */
class Search extends React.Component {
	/**
   * @description Quando a lista chega, preciso verificar
   * se o livro que vem na pesquisa já esta na minha prateleira,
   * esse metodo resolve esse problema para mim.
   * 
   * Adicionando mais um atributo na lista da pesquisa.
   * O atributo 'shelf'
   * 
   * @param {Array} listWillModificada 
   * @param {Array} arrayLista - de Lista, para mais detalhes
   * na posição [0] tem uma lista [1] tem uma lista e na posição [2]; 
   */
	addPropertyBook(listWillModificada, arrayLista) {
		for (let i = 0; i < arrayLista.length; i++) {
			listWillModificada.map((searBook) => {
				const bookFound = arrayLista[i].find((bk) => bk.id === searBook.id);
				if (bookFound) {
					searBook['shelf'] = bookFound['shelf'];
					return searBook;
				}
				return searBook;
			});
		}
	}

	/**
* @description Responsavel em pesquisar os Livros
* @param {string} event 
*/
	handleSearch(query) {
		if (query) {
			this.props.searchQuery(query, Object.values(this.props.listShelf));
		} else {
			this.props.cleanListBooks();
		}
	}

	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">
						Close
					</Link>
					<div className="search-books-input-wrapper">
						<input
							type="text"
							placeholder="Search by title or author"
							onChange={(event) => {
								const { value } = event.target;
								this.handleSearch(value);
							}}
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						<BookList listBooks={this.props.books} />
					</ol>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({ books: state.books.books, listShelf: state.mapShelf.shelf });
const mapDispatchToProps = (dispatch) => bindActionCreators({ ...actionSearch }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Search);

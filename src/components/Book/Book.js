import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionShelf from '../../store/actions/shelfs/shelfAction';

/**
 * @description Responsavel em representar um livro
 * @param title Titulo do livro
 * @param authors Autores do livro
 */
class Book extends Component {
	/**
   * @description Responsavel na mudança do select do livro
   * @param {object} event 
   */
	handleChange = (event) => {
		const { shelf } = this.props;
		const id = event.target.id;
		const shelfDesejada = event.target.value;
		const listOfKeys = [ ...Object.keys(shelf) ];

		let shelfActual = listOfKeys.find((key) => {
			return [ ...shelf[key] ].some((book) => book.id === id) ? key : undefined;
		});
		console.log(shelfActual, id);
		if (shelfDesejada === 'none') {
			this.removeShelf({ shelfActual, shelfDesejada, id });
			return;
		}

		if (shelfActual) {
			this.setShelfDesejada({ shelfActual, shelfDesejada, id });

			this.removeShelf({ shelfActual, shelfDesejada, id });
		} else {
			this.props.searchBook(id, shelfDesejada);
		}
	};

	setShelfDesejada = (shelf) => {
		const { id, shelfActual, shelfDesejada } = shelf;

		const bookFound = this.props.shelf[shelfActual].find((b) => b.id === id);
		bookFound.shelf = shelfDesejada;
		this.props.shelfUpdate(bookFound, shelfDesejada);
		this.props[shelfDesejada](bookFound);
	};

	removeShelf = (shelf) => {
		const { id, shelfActual, shelfDesejada } = shelf;

		let list = this.props.shelf[shelfActual];
		let newList = list.filter((book) => book.id !== id);

		if (shelfDesejada === 'none') {
			const book = list.find((bk) => bk.id === id);
			this.props.shelfUpdate(book, shelfDesejada);
		}

		this.props.addList(shelfActual, newList);
	};

	render() {
		return (
			<li>
				<div className="book">
					<div className="book-top">
						<div
							className="book-cover"
							style={{
								width: 128,
								height: 193,
								backgroundImage: `url(${this.props.imageLinks ? this.props.imageLinks.thumbnail : ''})`
							}}
						/>
						<div className="book-shelf-changer">
							<select
								onChange={this.handleChange}
								id={this.props.id}
								value={this.props.bookSelected ? this.props.bookSelected : 'none'}
							>
								<option value="move" disabled>
									Move to...
								</option>
								<option value="currentlyReading">Currently Reading</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
							</select>
						</div>
					</div>
					<div className="book-title">{this.props.title}</div>
					{this.props.authors && (
						<div className="book-authors">
							{this.props.authors.reduce((textFinal, author) => `${textFinal}, ${author}`)}
						</div>
					)}
				</div>
			</li>
		);
	}
}

const mapStateToProps = (state) => ({ shelf: state.mapShelf.shelf });
const mapDispatchToProps = (dispatch) => bindActionCreators({ ...actionShelf }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Book);

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import BookHeader from '../../components/BookHeader/BookHeader';
import BookShelf from '../../components/BookShelf/BookShelf';
import * as actionShelf from '../../store/actions/shelfs/shelfAction';

class Shelf extends React.Component {
	componentDidMount() {
		this.props.searchShelf();
	}

	translate = (text) => {
		switch (text) {
			case 'currentlyReading':
				return 'Lendo Atualmente';
			case 'wantToRead':
				return 'Quero Ler';
			case 'read':
				return 'Lido';
			default:
				return;
		}
	};

	render() {
		const { shelf } = this.props;

		return (
			<div className="list-books">
				<BookHeader title="MyReads" />
				<div className="list-books-content">
					<div>
						{[ ...Object.keys(shelf) ].map((key, i) => (
							<BookShelf key={i} title={this.translate(key)} listBooks={shelf[key]} />
						))}
					</div>
				</div>
				<div className="open-search">
					<Link to="/search">Add a book</Link>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({ shelf: state.mapShelf.shelf });
const mapDispatchToProps = (dispatch) => bindActionCreators({ ...actionShelf }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Shelf);

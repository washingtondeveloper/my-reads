import React from 'react';

import { Link } from 'react-router-dom';

import BookHeader from '../../components/BookHeader/BookHeader';
import BookShelf from '../../components/BookShelf/BookShelf';

export default props => (
    <div className="list-books">
        <BookHeader title="MyReads" />
        <div className="list-books-content">
            <div>
                {[...props.myMapShelf.keys()].map((key, i) => <BookShelf key={i} title={key} listBooks={props.myMapShelf.get(key)} onChangeBook={props.onChangeBook}/> )}
            </div>
        </div>
        <div className="open-search">
            <Link to="/search">Add a book</Link>
        </div>
    </div>
);
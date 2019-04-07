import React from 'react';
import { Route } from 'react-router-dom';

import Search from '../containers/Search/Search';
import Shelf from '../containers/Shelf/Shelf';

export default () => (
	<div className="app">
		<Route exact path="/" component={Shelf} />
		<Route path="/search" component={Search} />
	</div>
);

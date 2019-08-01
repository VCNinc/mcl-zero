import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Link } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

import Home from './home';
import Breach from './breach';
import Search from './search';

import 'bootstrap/dist/css/bootstrap.min.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faSearch } from '@fortawesome/free-solid-svg-icons';
library.add(faDatabase, faSearch);

class Header extends React.Component {
	render() {
		return (
			<Navbar bg="dark" variant="dark">
				<Container>
					<Link to="/">
						<Navbar.Brand><FontAwesomeIcon icon="database" /> &nbsp;Data Breaches</Navbar.Brand>
					</Link>
					<Nav className="mr-auto"></Nav>
					<Nav>
						<Link to="/search" className="nav-link">
							<FontAwesomeIcon icon="search" /> &nbsp;Search Breaches
						</Link>
					</Nav>
				</Container>
			</Navbar>
		);
	}
}

ReactDOM.render(
	<HashRouter>
		<React.Fragment>
			<Header />
			<Route path="/" exact component={Home} />
			<Route path="/search" exact component={Search} />
			<Route path="/breach/:id" exact component={Breach} />
	    </React.Fragment>
	</HashRouter>
, document.getElementById('root'));
serviceWorker.unregister();
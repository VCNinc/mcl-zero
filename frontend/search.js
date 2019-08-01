import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import './search.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSortAmountDown, faSort } from '@fortawesome/free-solid-svg-icons';
library.add(faSearch, faSortAmountDown, faSort);

class SearchBar extends React.Component {
	render() {
		return (
			<React.Fragment>
				<InputGroup size="lg" className="mt-6">
					<InputGroup.Prepend>
						<InputGroup.Text><FontAwesomeIcon icon="search" /> &nbsp; Search</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" onChange={this.props.searchChange} />
				</InputGroup>
				<Row>
					<Col>
						<InputGroup>
							<InputGroup.Prepend>
								<InputGroup.Text><FontAwesomeIcon icon="sort-amount-down" /> &nbsp; Sort By</InputGroup.Text>
							</InputGroup.Prepend>
							<FormControl as="select" onChange={this.props.sortChange}>
								<option value="name">Breach Title</option>
								<option value="records">Number of Records</option>
								<option value="date">Date of Breach</option>
							</FormControl>
						</InputGroup>
					</Col>
					<Col>
						<InputGroup>
							<InputGroup.Prepend>
								<InputGroup.Text><FontAwesomeIcon icon="sort" /> &nbsp; Order</InputGroup.Text>
							</InputGroup.Prepend>
							<FormControl as="select" onChange={this.props.orderChange}>
								<option value="asc">Ascending</option>
								<option value="desc">Descending</option>
							</FormControl>
						</InputGroup>
					</Col>
				</Row>
			</React.Fragment>
		);
	}
}

SearchBar.propTypes = {
  searchChange: PropTypes.func.isRequired,
  sortChange: PropTypes.func.isRequired,
  orderChange: PropTypes.func.isRequired
};

class Breach extends React.Component {
	render() {
		return (
			<Link to={this.props.url} className="card-row">
				<Card>
					<Card.Body>
						<div className="image-left">
							<img src={this.props.logo} alt="logo" />
						</div>
						<Card.Title>{this.props.title}</Card.Title>
						<Card.Subtitle className="mb-2 text-muted"><span>{parseInt(this.props.records).toLocaleString('en-US')}</span> Records &nbsp;&middot;&nbsp; <span>{this.props.date}</span></Card.Subtitle>
					</Card.Body>
				</Card>
			</Link>
		);
	}
}

Breach.propTypes = {
  title: PropTypes.string.isRequired,
  records: PropTypes.number.isRequired,
  logo: PropTypes.string.isRequired
};

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {breaches: [], search: "", sort: "name", order: "asc"};

		axios.get('https://haveibeenpwned.com/api/v2/breaches')
		.then(function(response){
			var breaches = [];
			response.data.forEach(function(breach) {
				breaches.push({
					title: breach.Title,
					records: breach.PwnCount,
					image: breach.LogoPath,
					url: "/breach/" + breach.Name,
					date: breach.BreachDate
				});
			});
			this.setState({breaches: breaches});
		}.bind(this));
	}

	render() {
		var object = this;
		function searchChange(event) {
			object.setState({
				search: event.target.value
			});
		}

		function sortChange(event) {
			object.setState({
				sort: event.target.value
			});
		}

		function orderChange(event) {
			object.setState({
				order: event.target.value
			});
		}

		var rows = [];

		var breaches = this.state.breaches;
		breaches.sort(function(a, b) {
			var keyA = 0;
			var keyB = 0;
			if(object.state.sort === "name") {
				keyA = a.title;
				keyB = b.title;
			} else if (object.state.sort === "records") {
				keyA = a.records;
				keyB = b.records;
			} else if (object.state.sort === "date") {
				keyA = a.date;
				keyB = b.date;
			}

			var ret_val;
			if(keyA < keyB) {
				ret_val = -1;
			} else if(keyA > keyB) {
				ret_val = 1;
			} else {
				ret_val = 0;
			}
			
			if(object.state.order === "desc") {
				ret_val *= -1;
			}

			return ret_val;
		});

		breaches.forEach(function(breach) {
			if(object.state.search === "" || breach.title.toLowerCase().includes(object.state.search.toLowerCase())) {
				rows.push(
					<Breach key={breach.title} title={breach.title} records={breach.records} logo={breach.image} url={breach.url} date={breach.date} />
				);
			}
		});

		return (
			<Container>
				<SearchBar searchChange={searchChange} sortChange={sortChange} orderChange={orderChange} />
				<React.Fragment>{rows}</React.Fragment>
			</Container>
		);
	}
}

export default Search;
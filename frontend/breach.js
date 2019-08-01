import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import RecordTypes from './record-types';

import './breach.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
library.add(faArrowLeft, faArrowRight);

class Breach extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "",
			records: 0,
			recordTypes: [],
			image: "",
			date: "",
			url: "",
			text: "",
			prev: null,
			next: null
		};

		axios.get('https://haveibeenpwned.com/api/v2/breaches')
		.then(function(response){
			response.data.forEach(function(breach, index) {
				if(breach.Name === this.props.match.params.id) {
					var prev = null;
					var next = null;

					if(index > 0) {
						prev = "/breach/" + response.data[index - 1].Name;
					}

					if(index < response.data.length - 1) {
						next = "/breach/" + response.data[index + 1].Name;
					}

					this.setState({
						title: breach.Title,
						records: breach.PwnCount,
						recordTypes: breach.DataClasses,
						image: breach.LogoPath,
						date: breach.BreachDate,
						url: breach.Domain,
						text: breach.Description,
						prev: prev,
						next: next
					});
				}
			}.bind(this))
		}.bind(this));
	}

	componentWillReceiveProps(props) {
		axios.get('https://haveibeenpwned.com/api/v2/breaches')
		.then(function(response){
			response.data.forEach(function(breach, index) {
				if(breach.Name === this.props.match.params.id) {
					var prev = null;
					var next = null;

					if(index > 0) {
						prev = "/breach/" + response.data[index - 1].Name;
					}

					if(index < response.data.length - 1) {
						next = "/breach/" + response.data[index + 1].Name;
					}

					this.setState({
						title: breach.Title,
						records: breach.PwnCount,
						recordTypes: breach.DataClasses,
						image: breach.LogoPath,
						date: breach.BreachDate,
						url: breach.Domain,
						text: breach.Description,
						prev: prev,
						next: next
					});
				}
			}.bind(this))
		}.bind(this));
	}

	render() {
		var left = "";
		var right = "";

		if(this.state.prev !== null) {
			left = (
				<Link to={this.state.prev} className="arrow-left">
					<FontAwesomeIcon icon="arrow-left" />
				</Link>
			);
		}

		if(this.state.next !== null) {
			right = (
				<Link to={this.state.next} className="arrow-right">
					<FontAwesomeIcon icon="arrow-right" />
				</Link>
			);
		}

		return (
			<Container className="full-height">
				<Card className="card-image">
					<React.Fragment>{left}</React.Fragment>
					<React.Fragment>{right}</React.Fragment>
					<Card.Body>
						<div className="image-left">
							<img src={this.state.image} alt="logo" />
						</div>
						<Card.Title>{this.state.title}</Card.Title>
						<Card.Subtitle className="mb-2 text-muted"><span>{parseInt(this.state.records).toLocaleString('en-US')}</span> Records &nbsp;&middot;&nbsp; <span>{this.state.date}</span> &nbsp;&middot;&nbsp; <span>{this.state.url}</span></Card.Subtitle>
						<Card.Text>
							<RecordTypes records={this.state.recordTypes} />
						</Card.Text>
						<Card.Text><span dangerouslySetInnerHTML={{ __html: this.state.text }}></span></Card.Text>
					</Card.Body>
				</Card>
			</Container>
		);
	}
}

export default Breach;
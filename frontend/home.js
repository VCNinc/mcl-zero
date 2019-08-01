import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';

import RecordTypes from './record-types';

import './home.scss';

class Filter extends React.Component {
	render() {
		var options = [];
		options.push(<option value="*">Anything</option>);
		this.props.options.forEach(function(option){
			options.push(<option value={option}>{option}</option>);
		});

		return (
			<div className="filter">
				<Form.Group as={Row} controlId="formPlaintextPassword">
					<Form.Label column sm="4">
						<b>Must Contain:</b>
					</Form.Label>
					<Col sm="8">
						<Form.Control as="select" onChange={this.props.callback}>
							{options}
						</Form.Control>
					</Col>
				</Form.Group>
			</div>
		);
	}
}

Filter.propTypes = {
  callback: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

class Information extends React.Component {
	render() {
		return (
			<Jumbotron fluid>
				<Container>
					<h1>Data Breaches from 2008 to 2019</h1>
					<p>Between 2008 and 2019, more than 10,000,000,000 user records have been stolen and subsequently leaked onto the internet. This website catalogs more than 1,000 of those breaches.</p>
					<p><b>Key: &nbsp;
						<Badge variant="danger">Sensitive Data</Badge>&nbsp;
						<Badge variant="warning">Personal Data</Badge>&nbsp;
						<Badge variant="info">Technical Data</Badge>&nbsp;
						<Badge variant="secondary">Other Data</Badge>
					</b></p>
					<Filter callback={this.props.callback} options={this.props.options} />
				</Container>
			</Jumbotron>
		);
	}
}

Information.propTypes = {
  callback: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

class Breach extends React.Component {
	render() {
		return (
			<Card className="mb-4">
				<div className="card-img">
					<img alt="" src={this.props.logo} />
				</div>
				<Card.Body>
					<Card.Title>{this.props.title}</Card.Title>
					<Card.Subtitle className="mb-2 text-muted"><span>{parseInt(this.props.records).toLocaleString('en-US')}</span> Records</Card.Subtitle>
					<Card.Text className="tags">
						<RecordTypes records={this.props.recordTypes} />
					</Card.Text>
					<Link to={this.props.url}>
						<Button variant="primary">More Information</Button>
					</Link>
				</Card.Body>
			</Card>
		);
	}
}

Breach.propTypes = {
  title: PropTypes.string.isRequired,
  records: PropTypes.number.isRequired,
  recordTypes: PropTypes.array.isRequired,
  logo: PropTypes.string.isRequired
};

class Grid extends React.Component {
	constructor(props) {
		super(props);
		this.state = {breaches: [], options: [], filter: "*"};

		axios.get('https://haveibeenpwned.com/api/v2/breaches')
		.then(function(response){
			var breaches = [];
			var options = [];
			response.data.forEach(function(breach) {
				breach.DataClasses.forEach(function(type) {
					if(!options.includes(type)) {
						options.push(type);
					}
				});
				breaches.push({
					title: breach.Title,
					records: breach.PwnCount,
					recordTypes: breach.DataClasses,
					image: breach.LogoPath,
					url: "/breach/" + breach.Name
				});
			});
			this.setState({breaches: breaches, options: options});
		}.bind(this));
	}

	render() {
		var component = this;
		function callback(event) {
			component.setState({filter: event.target.value});
		}

		var cols = [];
		var filter = this.state.filter;

		this.state.breaches.forEach(function(breach) {
			if(filter === "*" || breach.recordTypes.includes(filter)) {
				cols.push(
					<Col xs={12} sm={6} md={4} lg={3} key={breach.title}>
						<Breach title={breach.title} records={breach.records} recordTypes={breach.recordTypes} logo={breach.image} url={breach.url} />
					</Col>
				);
			}
		});

		return (
			<React.Fragment>
				<Information callback={callback} options={this.state.options} />
				<Container>
					<Row>{cols}</Row>
				</Container>
			</React.Fragment>
		);
	}
}

class Home extends React.Component {
	render() {
		return (<Grid />);
	}
}

export default Home;
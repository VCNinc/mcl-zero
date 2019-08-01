import React from 'react';
import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';

class RecordTypes extends React.Component {
	render() {
		var badges = [];

		var types = {
			"Passwords": "danger",
			"Sexual orientations": "danger",
			"Email messages": "danger",
			"Passport numbers": "danger",
			"Biometric data": "danger",
			"Names": "warning",
			"Email addresses": "warning",
			"Usernames": "warning",
			"Dates of birth": "warning",
			"Employers": "warning",
			"Job titles": "warning",
			"Phone numbers": "warning",
			"Physical addresses": "warning",
			"Social media profiles": "warning",
			"Genders": "warning",
			"Geographic locations": "warning",
			"Races": "warning",
			"Relationship statuses": "warning",
			"Spoken languages": "warning",
			"Address book contacts": "warning",
			"Profile photos": "warning",
			"IP addresses": "info",
			"Device information": "info",
			"Apps installed on devices": "info",
			"Cellular network names": "info",
			"IMEI numbers": "info",
			"IMSI numbers": "info"
		};

		this.props.records.forEach(function(record) {
			var type = "secondary";
			if(types.hasOwnProperty(record)) {
				type = types[record];
			}

			badges.push(<><Badge variant={type}>{record}</Badge>&nbsp;</>);
		});

		return badges;
	}
}

RecordTypes.propTypes = {
  records: PropTypes.array.isRequired
};

export default RecordTypes;
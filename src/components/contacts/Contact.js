import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteContact } from '../../Redux/actions/contactActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
  faTimes,
  faPencilAlt
} from '@fortawesome/free-solid-svg-icons';

class Contact extends Component {
  state = {
    showContactInfo: false
  };

  infoToggle = () => {
    this.setState({ showContactInfo: !this.state.showContactInfo });
  };

  deleteItem = id => {
    this.props.deleteContact(id);
  };

  render() {
    const { name, email, phone, id } = this.props.contact;

    return (
      <div className="card card-body mb-3">
        <h3 className="text-capitalize">
          <span onClick={this.infoToggle} style={{ cursor: 'pointer' }}>
            {name}
            <FontAwesomeIcon icon={faArrowDown} className="ml-2 text-warning" />
          </span>
          <FontAwesomeIcon
            icon={faTimes}
            className="text-danger float-right"
            style={{ cursor: 'pointer' }}
            onClick={() => this.deleteItem(id)}
          />
          <Link to={`contact/edit/${id}`}>
            <FontAwesomeIcon
              icon={faPencilAlt}
              style={{
                cursor: 'pointer',
                float: 'right',
                color: 'black',
                marginRight: '1rem'
              }}
            />
          </Link>
        </h3>
        {this.state.showContactInfo ? (
          <ul className="list-group">
            <li className="list-group-item">Email: {email}</li>
            <li className="list-group-item">Phone: {phone}</li>
          </ul>
        ) : null}
      </div>
    );
  }
}

Contact.propTypes = {
  contact: propTypes.object.isRequired,
  deleteContact: propTypes.func.isRequired
};

export default connect(null, { deleteContact })(Contact);

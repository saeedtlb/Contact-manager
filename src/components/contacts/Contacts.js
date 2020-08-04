import React, { Component } from 'react';
import Contact from './Contact';
import propTypes from 'prop-types';
import { getContacts } from '../../Redux/actions/contactActions';
import { connect } from 'react-redux';

class Contacts extends Component {
  componentDidMount() {
    this.props.getContacts();
  }

  render() {
    const { contacts } = this.props;
    return (
      <>
        <h1 className="display-3 text-capitalize">
          <span className="text-danger">contact </span>
          list
        </h1>
        {contacts.map(contact => (
          <Contact contact={contact} key={contact.id} />
        ))}
      </>
    );
  }
}

Contacts.propTypes = {
  contacts: propTypes.array.isRequired,
  getContacts: propTypes.func.isRequired
};

const mapStateToProps = state => ({
  contacts: state.contact.contacts
});

export default connect(mapStateToProps, { getContacts })(Contacts);

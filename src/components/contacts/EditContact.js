import React, { Component } from 'react';
import { getContact, updateContact } from '../../Redux/actions/contactActions';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import TextInputGroup from '../layout/TextInputGroup';

class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {
      nameError: null,
      emailError: null,
      phoneError: null
    }
  };

  updateInput = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getContact(id);
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { name, email, phone } = nextProps.contact;
    this.setState({
      name,
      email,
      phone
    });
  }

  validating = (input, type, valid, msg) => {
    if (!valid.test(input)) {
      this.setState(state => {
        return {
          errors: {
            ...state.errors,
            [type]: msg
          }
        };
      });
    } else {
      this.setState(state => {
        return {
          errors: {
            ...state.errors,
            [type]: ''
          }
        };
      });
    }
  };

  editPerson = event => {
    event.preventDefault();

    const { name, email, phone, errors } = this.state;

    // Create valid structure for inputs
    const validName = /^[A-Za-z]{3,}\s[A-Za-z]{3,}$/;
    const validEmail = /^[A-Za-z][A-Za-z0-9]{4,}@[a-z]{3,6}.[a-z]{2,5}$/;
    const validPhone = /^09[0-9]{9}$/;

    // call validation function to check each input
    this.validating(
      name,
      'nameError',
      validName,
      'Your Name is invalid (your fitst and last name with space)'
    );
    this.validating(
      email,
      'emailError',
      validEmail,
      'Your Email is invalid please check it again'
    );
    this.validating(
      phone,
      'phoneError',
      validPhone,
      'Your phone number is invalid (It must start with 09 and it must be 11 digit)'
    );
    const { nameError, emailError, phoneError } = errors;
    if (
      nameError === phoneError &&
      phoneError === emailError &&
      nameError !== null
    ) {
      const { id } = this.props.match.params;
      const newContact = {
        name,
        email,
        phone,
        id
      };

      this.props.updateContact(newContact);

      this.setState({
        name: '',
        email: '',
        phone: ''
      });

      this.props.history.push('/');
    }
  };

  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <div>
        <div className="card mb-3">
          <div className="card-header text-capitalize">update contact</div>
          <div className="card-body">
            <form onSubmit={this.editPerson}>
              {/* Name */}
              <TextInputGroup
                id="name"
                placeholder="Enter your Name..."
                label="Name"
                value={name}
                onChange={this.updateInput}
                error={errors.nameError}
              />
              {/* Email */}
              <TextInputGroup
                id="email"
                placeholder="Enter Email..."
                label="Email"
                type="email"
                value={email}
                onChange={this.updateInput}
                error={errors.emailError}
              />
              {/* Phone */}
              <TextInputGroup
                id="phone"
                placeholder="Enter Phone..."
                label="Phone"
                value={phone}
                onChange={this.updateInput}
                error={errors.phoneError}
              />

              <input
                type="submit"
                value="Edit Contact"
                className="btn btn-block btn-outline-success"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

EditContact.propTypes = {
  contact: propTypes.object.isRequired,
  getContact: propTypes.func.isRequired
};

const mapStateToProps = state => ({
  contact: state.contact.contact
});

export default connect(mapStateToProps, { getContact, updateContact })(
  EditContact
);

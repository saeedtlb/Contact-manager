import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { addContact } from '../../Redux/actions/contactActions';
import TextInputGroup from '../layout/TextInputGroup';

class AddContact extends Component {
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

  addPerson = event => {
    event.preventDefault();

    const { name, email, phone, errors } = this.state;

    // Create valid structure for inputs
    const validName = /^[A-Za-z]{3,}\s[A-Za-z]{3,}$/;
    const validEmail = /^[A-Za-z][A-Za-z0-9]{4,}@[a-z]{3,8}.[a-z]{2,5}$/;
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
      const newContact = {
        name,
        email,
        phone
      };

      this.props.addContact(newContact);

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
          <div className="card-header text-capitalize">contact</div>
          <div className="card-body">
            <form onSubmit={this.addPerson}>
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
                value="Add Contact"
                className="btn btn-block btn-outline-success"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddContact.propTypes = {
  addContact: propTypes.func.isRequired
};

export default connect(null, { addContact })(AddContact);

import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';

const TextInputGroup = props => {
  const { id, type, placeholder, label, value, onChange, error } = props;
  return (
    <div className="form-group">
      <label htmlFor="name">{label}:</label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete="off"
        className={classnames(
          'form-control form-control-lg',
          {
            'is-invalid': error
          },
          { 'is-valid': !error && error !== null }
        )}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
      {!error && error !== null && (
        <div className="valid-feedback">Correct</div>
      )}
    </div>
  );
};

TextInputGroup.propTypes = {
  id: propTypes.string.isRequired,
  type: propTypes.string,
  placeholder: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  error: propTypes.string
};

TextInputGroup.defualtProps = {
  type: 'text'
};

export default TextInputGroup;

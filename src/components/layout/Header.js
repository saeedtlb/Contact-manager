import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faQuestion } from '@fortawesome/free-solid-svg-icons';

const Header = props => {
  return (
    <nav className="nav navbar bg-danger mb-3 py-0 navbar-dark nabar-expand-sm">
      <div className="container">
        <a href="/" className="navbar-brand text-capitalize">
          {props.branding}
        </a>
        <div>
          <ul className="navbar-nav flex-row">
            {/* Home */}
            <li className="nav-item">
              <Link to="/" className="nav-link text-capitalize">
                home
                <FontAwesomeIcon icon={faHome} />
              </Link>
            </li>
            {/* Add */}
            <li className="nav-item">
              <Link to="/contact/add" className="nav-link mx-3 text-capitalize">
                add
                <FontAwesomeIcon icon={faPlus} />
              </Link>
            </li>
            {/* About */}
            <li className="nav-item">
              <Link to="/about" className="nav-link text-capitalize">
                about
                <FontAwesomeIcon icon={faQuestion} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

Header.defaultProps = {
  branding: 'My App'
};

Header.propTypes = {
  branding: propTypes.string.isRequired
};

export default Header;

import React from 'react';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import profileButtonStyle from './profile-button.module.css';
import { profileButtonPropTypes } from 'utils/type';
function ProfileButton({ link, onSignOut, title, children }) {
  const location = useLocation();

  return (
    <NavLink
      className={profileButtonStyle.link}
      style={location.pathname === link ? { opacity: 1 } : { opacity: 0.6 }}
      to={link && link}
    >
      <div onClick={onSignOut} className={profileButtonStyle.button}>
        {children}
        <p className="text text_type_main-medium">{title}</p>
      </div>
    </NavLink>
  );
}
ProfileButton.propTypes = profileButtonPropTypes.isRequired;
export default ProfileButton;

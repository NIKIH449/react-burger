import React from 'react';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import profileButtonStyle from './profile-button.module.css';

function ProfileButton(props) {
  const location = useLocation();

  return (
    <NavLink
      className={profileButtonStyle.link}
      style={
        location.pathname === props.link ? { opacity: 1 } : { opacity: 0.6 }
      }
      to={props.link && props.link}
    >
      <div onClick={props.onSignOut} className={profileButtonStyle.button}>
        {props.children}
        <p className="text text_type_main-medium">{props.title}</p>
      </div>
    </NavLink>
  );
}

export default ProfileButton;

import React, { FC, MouseEventHandler, ReactNode } from 'react';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import profileButtonStyle from './profile-button.module.css';
const ProfileButton: FC<{
  link: string;
  onSignOut: MouseEventHandler<HTMLDivElement> | undefined;
  title: string;
  children: ReactNode;
}> = ({ link, onSignOut, title, children }) => {
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
};
export { ProfileButton };

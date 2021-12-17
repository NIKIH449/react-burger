import React from 'react';
import { headerButtonProTypes } from 'utils/type';
import headerButtonStyle from './header-button.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
function HeaderButton({ children, name, link }) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div
      style={
        location.pathname === link || location.pathname === link + '/orders'
          ? { opacity: 1 }
          : { opacity: 0.6 }
      }
      onClick={() => {
        navigate(link);
      }}
      className={headerButtonStyle.button}
    >
      {children}
      <p className="ml-2 text text_type_main-default">{name}</p>
    </div>
  );
}
HeaderButton.propTypes = headerButtonProTypes.isRequired;
export default HeaderButton;

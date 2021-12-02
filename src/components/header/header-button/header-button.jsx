import React from 'react';
import { headerButtonProTypes } from 'utils/type';
import headerButtonStyle from './header-button.module.css';

function HeaderButton({children, name}) {
  return (
    <div className={headerButtonStyle.button}>
      <a className={headerButtonStyle.link} href="http://localhost:3000/react-burger">
        {children}
        <p className="ml-2 text text_type_main-default">{name}</p>
      </a>
    </div>
  );
}
HeaderButton.propTypes = headerButtonProTypes.isRequired;
export default HeaderButton;

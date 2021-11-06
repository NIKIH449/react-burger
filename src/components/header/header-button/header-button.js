import React from 'react';
import headerButtonStyle from './header-button.module.css';

function HeaderButton(props) {
  return (
    <div className={headerButtonStyle.button}>
      <a className={headerButtonStyle.link}>
        {props.children}
        <p className="ml-2 text text_type_main-default">{props.name}</p>
      </a>
    </div>
  );
}

export default HeaderButton;

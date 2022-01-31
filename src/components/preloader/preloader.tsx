import React from 'react';
import preloaderStyle from './preloader.module.css';
const Preloader = () => {
  const russian = localStorage.getItem('rus');
  return (
    <div className={preloaderStyle.preloader}>
      <p className="text text_type_main-large">
        {russian ? 'Загрузка' : 'LOADING'}
      </p>
    </div>
  );
};

export { Preloader };

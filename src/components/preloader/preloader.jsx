import React from 'react';
import preloaderStyle from './preloader.module.css'
export const Preloader = () => {
  return (
    <div className={preloaderStyle.preloader}>
      <p className="text text_type_main-large">LOADING</p>
    </div>
  );
};

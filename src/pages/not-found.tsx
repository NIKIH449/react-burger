import React from 'react';
import notFoundStyles from './not-found.module.css';
const NotFound = () => {
  const russian = localStorage.getItem('rus');
  return (
    <div className={notFoundStyles.notFound}>
      <h2 className="text text_type_main-large">
        {russian ? 'Упс!' : ' Oops!'}
      </h2>
      <p className="text text_type_main-medium">
        {russian ? '404 - страница не найдена.' : ' 404 - page not found.'}
      </p>
      <p className="text text_type_main-default">
        {russian
          ? 'Страница которую вы ищете, возможно, была удалена или временно недоступна.'
          : 'The page you looking for might have been deleted or temporaly unavailable '}
      </p>
    </div>
  );
};

export { NotFound };

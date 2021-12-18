import React from 'react';
import notFoundStyles from './not-found.module.css';
export function NotFound() {
  return (
    <div className={notFoundStyles.notFound}>
      <h2 className="text text_type_main-large">Упс!</h2>
      <p className="text text_type_main-medium">404 - страница не найдена.</p>
      <p className="text text_type_main-default">
        Страница которую вы ищете, возможно, была удалена или временно недоступна.
      </p>
    </div>
  );
}

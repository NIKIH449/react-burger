import React from 'react';
import appStyles from './app.module.css';
import Main from '../main/main';
import AppHeader from '../header/app-header';
import '../../fonts/fonts.css';
import { INGREDIENTS_URL } from '../../utils/constants';
import { useEffect } from 'react';

function App() {
  const [ingredients, setIngredients] = React.useState([]);

  useEffect(() => {
    fetch(INGREDIENTS_URL)
      .then((data) => data.json())
      .then((data) => setIngredients(data.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <Main ingredients={ingredients} />
    </div>
  );
}

export default App;

import React from 'react';
import appStyles from './app.module.css';
import Main from '../main/main';
import AppHeader from '../header/app-header';
import '../../fonts/fonts.css';

function App() {
  const [menu, setMenu] = React.useState([]);
  const data = 'https://norma.nomoreparties.space/api/ingredients';

  React.useEffect(() => {
    fetch(data)
      .then((data) => {
        if (data.ok) {
          return data.json();
        } else {
          return Promise.reject(data.status);
        }
      })
      .then((data) => setMenu(data.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={appStyles.page}>
      <AppHeader />
      <Main data={menu} />
    </div>
  );
}

export default App;

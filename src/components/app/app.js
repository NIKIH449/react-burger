import React from 'react';
import appStyles from './app.module.css';
import Main from '../main/main';
import Header from '../header/header';
import '../../fonts/fonts.css';
import { data } from '../../utils/data';
import PropTypes from 'prop-types';

function App() {
  const [menu, setMenu] = React.useState([]);

  React.useEffect(() => {
    setMenu(data);
  });

  return (
    <div className={appStyles.page}>
      <Header />
      <Main data={menu} />
    </div>
  );
}



export default App;

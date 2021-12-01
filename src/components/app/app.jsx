import React from 'react';
import appStyles from './app.module.css';
import Main from '../main/main';
import AppHeader from '../header/app-header';
import '../../fonts/fonts.css';

function App() {
  return (
    <div className={appStyles.app}>
      <AppHeader />
      <Main />
    </div>
  );
}

export default App;

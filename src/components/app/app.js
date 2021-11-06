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
  }, [menu]);

  return (
    <div className={appStyles.page}>
      <Header />
      <Main data={menu} />
    </div>
  );
}

App.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      image: PropTypes.sting,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number,
    })
  ),
};

export default App;

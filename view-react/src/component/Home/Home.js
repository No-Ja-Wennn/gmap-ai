import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Sidebar from '../Sidebar/Sidebar';
import Dashboard from '../Dashboard';
import VietNamMap from '../VietNamMap';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Home() {
  const [locations, setLocations] = useState([]);

  return (
    <div className={cx('wrapper')}>
      <Sidebar />
      <Dashboard setLocations={setLocations}/>
      <div className={cx('map')}>
        <VietNamMap locationsWay={locations} />
      </div>
    </div>
  );
}

export default Home;

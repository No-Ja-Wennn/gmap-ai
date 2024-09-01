import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Sidebar from '../Sidebar/Sidebar';
import Dashboard from '../Dashboard';
import VietNamMap from '../VietNamMap';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Home() {
  const [locations, setLocations] = useState([]);
  const [sidebarActive, setSidebarActive] = useState(1);

  return (
    <div className={cx('wrapper')}>
      <Sidebar setActive={setSidebarActive} active={sidebarActive}/>
      <Dashboard setLocations={setLocations} sidebarActive={sidebarActive}/>
      <div className={cx('map')}>
        <VietNamMap locationsWay={locations} />
      </div>
      <span className={cx("tag")}>Developed by CLOSE AI GROUP 8</span>
    </div>
  );
}

export default Home;

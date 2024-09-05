import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Sidebar from '../Sidebar/Sidebar';
import Dashboard from '../Dashboard';
import VietNamMap from '../VietNamMap';
import { useState } from 'react';
import ShowTable from '../ShowTable';

const cx = classNames.bind(styles);

function Home() {
  const [locations, setLocations] = useState([]);
  const [sidebarActive, setSidebarActive] = useState(1);
  const [showTableValue, setShowTableValue] = useState([])

  return (
    <div className={cx('wrapper')}>
      <Sidebar setActive={setSidebarActive} active={sidebarActive} />
      <Dashboard setLocations={setLocations} setShowTableValue={setShowTableValue} sidebarActive={sidebarActive} />
      <div className={cx('map')}>
        <VietNamMap locationsWay={locations} />
      </div>
      <ShowTable showTableValue={showTableValue}/>
      <span className={cx('tag')}>Developed by CLOSE AI GROUP 8</span>
    </div>
  );
}

export default Home;

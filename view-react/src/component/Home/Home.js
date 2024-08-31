import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Sidebar from '../Sidebar/Sidebar';
import Dashboard from '../Dashboard';
import Vietnam from '@react-map/vietnam';
import VietNamMap from '../VietNamMap';

const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx('wrapper')}>
      <Sidebar />
      <Dashboard />
      <div className={cx('map')}>
        <VietNamMap/>
      </div>
    </div>
  );
}

export default Home;

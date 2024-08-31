import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpDown, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import FindItem from '../FindItem';

const cx = classNames.bind(styles);

function Dashboard() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('address')}>
        <div className={cx('address__left')}>
          <FontAwesomeIcon icon={faLocationDot} />
          <FontAwesomeIcon icon={faLocationDot} />
        </div>
        <div className={cx('address__right')}>
          <div className={cx('address__outline')}>
            <input className={cx('address__input')} type="text" placeholder="Choose destination poin" />
          </div>
          <div className={cx('address__outline')}>
            <input className={cx('address__input')} type="text" placeholder="Choose starting poin" />
          </div>
        </div>
        <FontAwesomeIcon className={cx('revert')} icon={faArrowsUpDown} />
      </div>
      <div className={cx('list')}>
        <FindItem/>
        <FindItem/>
        <FindItem/>
        <FindItem/>
        <FindItem/>
        <FindItem/>
        <FindItem/>
        <FindItem/>
        <FindItem/>
        <FindItem/>
        <FindItem/>
        <FindItem/>
        <FindItem/>
      </div>
    </div>
  );
}

export default Dashboard;

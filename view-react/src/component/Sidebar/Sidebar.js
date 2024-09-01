import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faPersonWalking } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Sidebar({active, setActive}) {
  return (
    <div className={cx('wrapper')}>
      <FontAwesomeIcon className={cx('list-icon')} icon={faList} />
      <ul className={cx('list')}>
        <li className={cx('items', {active: active === 1})} onClick={()=>setActive(1)}>
          <FontAwesomeIcon className={cx('per-walking')} icon={faPersonWalking} />
          <span className={cx('text')}>Distance</span>
        </li>
        <li className={cx('items', {active: active === 2})} onClick={()=>setActive(2)}>
          <FontAwesomeIcon className={cx('per-walking')} icon={faPersonWalking} />
          <span className={cx('text')}>Way</span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

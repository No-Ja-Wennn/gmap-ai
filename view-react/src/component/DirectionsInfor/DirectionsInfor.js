import classNames from 'classnames/bind';
import styles from './DirectionsInfor.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function calculateTravelTime(distance, speed) {
  const timeInHours = distance / speed;
  const hours = Math.floor(timeInHours);
  const minutes = Math.round((timeInHours - hours) * 60);
  return `${hours} hr ${minutes} min`;
}

function DirectionsInfor({data}) {
  return (
    <div className={cx('wrapper')}>
      <FontAwesomeIcon className={cx('icon')} icon={faCar} />
      <div className={cx('content')}>
        <div className={cx("infor")}>
          <p className={cx('title')}>Đi từ {data.start.name} đến {data.end.name}</p>
          <p className={cx('more')}>{data.way.map(location=>
            "=>" + location.name 
          )}</p>
        </div>
        <div className={cx("numbers")}>
          <p className={cx('time')}>{calculateTravelTime(data.distance.toFixed(2), 50)}</p>
          <p className={cx('distance-count')}>{data.distance.toFixed(2)}KM</p>
        </div>
      </div>
    </div>
  );
}

export default DirectionsInfor;

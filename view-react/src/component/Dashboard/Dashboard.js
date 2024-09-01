import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpDown, faCar, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import FindItem from '../FindItem';
import { useEffect, useRef, useState } from 'react';
import DirectionsInfor from '../DirectionsInfor';

const cx = classNames.bind(styles);

function Dashboard({ setLocations, sidebarActive }) {
  const [names, setNames] = useState([]);
  const [inputStartValue, setInputStartValue] = useState('');
  const [inputEndValue, setInputEndValue] = useState('');
  const [inputStartId, setInputStartId] = useState(0);
  const [inputEndId, setInputEndId] = useState(0);
  const [focusedInput, setFocusedInput] = useState(null);
  const [locationsRes, setLocationsRes] = useState([]);
  const [findSuccess, setFindSuccess] = useState(false);
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const listRef = useRef(null);

  useEffect(()=>{
    setFindSuccess(false)
  },[sidebarActive])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/gmap/getnames/')
      .then((response) => response.json())
      .then((data) => {
        setNames(data);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleSpanClick = (text, id) => {
    if (focusedInput === 'input1') {
      setInputStartValue(text);
      setInputStartId(parseInt(id));
    } else if (focusedInput === 'input2') {
      setInputEndValue(text);
      setInputEndId(parseInt(id));
    }
  };

  const handleChangeStartInput = (e) => setInputStartValue(e.target.value);
  const handleChangeEndInput = (e) => setInputEndValue(e.target.value);

  const handleBlur = () => setFocusedInput(null);

  const handleRecevieResponseWay = (data) => {
    setFocusedInput(null);
    setFindSuccess(true);
    setLocationsRes(data);
    setLocations(data.way);
  };

  const handleRecevieResponseDistance = (data)=>{
    console.log(data)
    setFocusedInput(null);
    setFindSuccess(true);
    data.way = [data.start, data.end]
    setLocationsRes(data);
    setLocations([data.start, data.end]);
  }

  const handleSubmit = () => {
    const data = { id: [inputStartId, inputEndId] };
    if (sidebarActive === 1) {
      fetch('http://localhost:8000/gmap/getdistance/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to send message');
          }
          return response.json();
        })
        .then((data) => handleRecevieResponseDistance(data))
        .catch((error) => console.error('Error:', error));
    } else {
      fetch('http://localhost:8000/gmap/getway/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to send message');
          }
          return response.json();
        })
        .then((data) => handleRecevieResponseWay(data))
        .catch((error) => console.error('Error:', error));
    }
  };

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>{sidebarActive === 1 ? 'Khoảng cách chim bay' : 'Tìm đường đi'}</h2>
      <div className={cx('address')}>
        <div className={cx('address__left')}>
          <FontAwesomeIcon icon={faLocationDot} />
          <FontAwesomeIcon icon={faLocationDot} />
        </div>
        <div className={cx('address__right')}>
          <div className={cx('address__outline')}>
            <input
              type="text"
              placeholder="Choose destination poin"
              className={cx('address__input')}
              value={inputStartValue}
              // onChange={handleChangeStartInput}
              onFocus={() => setFocusedInput('input1')}
              // onBlur={handleBlur}
              ref={input1Ref}
            />
          </div>
          <div className={cx('address__outline')}>
            <input
              type="text"
              placeholder="Choose starting poin"
              className={cx('address__input')}
              value={inputEndValue}
              // onChange={handleChangeEndInput}
              onFocus={() => setFocusedInput('input2')}
              // onBlur={handleBlur}
              ref={input2Ref}
            />
          </div>
        </div>
        <FontAwesomeIcon className={cx('revert')} icon={faArrowsUpDown} />
      </div>
      <button className={cx('find-btn')} onClick={handleSubmit}>
        Find
      </button>
      {focusedInput ? (
        <div className={cx('list')} ref={listRef}>
          {names.map((name) => (
            <FindItem key={name.id} id={name.id} name={name.name} handleSpanClick={handleSpanClick} />
          ))}
        </div>
      ) : (
        findSuccess && <DirectionsInfor data={locationsRes} />
      )}
    </div>
  );
}

export default Dashboard;

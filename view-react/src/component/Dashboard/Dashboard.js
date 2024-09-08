import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpDown, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import FindItem from '../FindItem';
import { useEffect, useRef, useState } from 'react';
import DirectionsInfor from '../DirectionsInfor';
import pathApi from '../../pathApi';

const cx = classNames.bind(styles);

function Dashboard({ setLocations, sidebarActive, setShowTableValue }) {
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

  useEffect(() => {
    setFindSuccess(false);
  }, [sidebarActive]);

  console.log(pathApi + 'getnames/');

  useEffect(() => {
    fetch(pathApi + 'getnames/')
      .then((response) => {
        console.log(response)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        } else {
          throw new Error('Response is not JSON');
        }
      })
      .then((data) => {
        console.log(data);
        setNames(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  // useEffect(() => {
  //   console.log("hello");
  //   fetch(pathApi + 'getnames/')
  //     .then((response) => {
  //       console.log(response);  // Log chi tiết response
  //       console.log('Response Headers:', response.headers);  // Log headers
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const contentType = response.headers.get('content-type');
  //       if (contentType && contentType.includes('application/json')) {
  //         return response.json();
  //       } else {
  //         throw new Error('Response is not JSON. Content-Type is: ' + contentType);
  //       }
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setNames(data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);


  const handleSpanClick = (text, id) => {
    if (focusedInput === 'input1') {
      setInputStartValue(text);
      setInputStartId(parseInt(id));
    } else if (focusedInput === 'input2') {
      setInputEndValue(text);
      setInputEndId(parseInt(id));
    }
  };

  const handleRecevieResponseWay = (data) => {
    setShowTableValue(data.tableShow);
    setFocusedInput(null);
    setFindSuccess(true);
    setLocationsRes(data);
    setLocations(data.way);
  };

  const handleRecevieResponseDistance = (data) => {
    setFocusedInput(null);
    setFindSuccess(true);
    data.way = [data.start, data.end];
    setLocationsRes(data);
    setLocations([data.start, data.end]);
  };

  const handleSubmit = () => {
    const data = { id: [inputStartId, inputEndId] };
    if (sidebarActive === 1) {
      fetch(pathApi + 'getdistance/', {
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
      fetch(pathApi + 'getway/', {
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
              defaultValue={inputStartValue}
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
              defaultValue={inputEndValue}
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

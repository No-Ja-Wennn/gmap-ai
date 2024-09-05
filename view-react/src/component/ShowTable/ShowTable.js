import classNames from 'classnames/bind';
import styles from './ShowTable.module.scss';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ShowTable({ showTableValue }) {
  console.log(showTableValue);
  const [showbox, setShowbox] = useState(false);
  const [showType, setShowType] = useState('table');
  useEffect(() => {}, [showTableValue]);

  return (
    <div className={cx('wrapper', { show: showbox })}>
      {showbox ? (
        <FontAwesomeIcon className={cx('icon-left')} icon={faAnglesRight} onClick={() => setShowbox(!showbox)} />
      ) : (
        <FontAwesomeIcon className={cx('icon-left')} icon={faAnglesLeft} onClick={() => setShowbox(!showbox)} />
      )}
      <div className={cx('task-bar')}>
        <FontAwesomeIcon className={cx('icon-back')} icon={faArrowLeft} />
        <div className={cx('change-btn')}>
          <span className={cx('change-text')} onClick={() => setShowType('table')}>
            Table
          </span>
          <span className={cx('change-text')} onClick={() => setShowType('json')}>
            JSON
          </span>
          <span className={cx('change-active', { right: showType === 'json', left: showType === 'table' })}></span>
        </div>
      </div>
      <div className={cx('outline-table')}>
        {showType === 'table' ? (
          <table className={cx('table')}>
            <thead>
              <tr className={cx('row')}>
                <th className={cx('col')}>index</th>
                <th className={cx('col')}>L rong</th>
                <th className={cx('col')}>U</th>
                <th className={cx('col')}>U thuoc C</th>
                <th className={cx('col')}>V</th>
                <th className={cx('col')}>L1</th>
                <th className={cx('col')}>L</th>
              </tr>
            </thead>
            <tbody>
              {showTableValue.map((value, index) => (
                <tr className={cx('row')} key={index}>
                  <td className={cx('col')}>{index}</td>
                  <td className={cx('col')}>{value.isEmpty.toString()}</td>
                  <td className={cx('col')}>{value.u.id}</td>
                  <td className={cx('col')}>{value.uBelongToT.toString()}</td>
                  <td className={cx('col')}>{value.v.map((id) => id.id + ', ')}</td>
                  <td className={cx('col')}>{value.l1.map((id) => id.id + ', ')}</td>
                  <td className={cx('col')}>{value.l.map((id) => id.id + ', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          showTableValue &&
          showTableValue.map((value, index) => (
              <p className={cx('outline-json')} key={index}>
                {"{"}
                <p className={cx('tab1')}>u: {JSON.stringify(value.u)},</p>
                <p className={cx('tab1')}>isEmpty: {value.isEmpty.toString()},</p>
                <p className={cx('tab1')}>uBelongToT: {value.uBelongToT.toString()},</p>
                <p className={cx('tab1')}>V: {value.v.map(value=>(
                  <p className={cx('tab2')}>{JSON.stringify(value)},</p>
                ))},</p>
                <p className={cx('tab1')}>L1: {value.l1.map(value=>(
                  <p className={cx('tab2')}>{JSON.stringify(value)},</p>
                ))},</p>
                <p className={cx('tab1')}>L: {value.l.map(value=>(
                  <p className={cx('tab2')}>{JSON.stringify(value)},</p>
                ))},</p>
                {"},"}
              </p>
          ))
        )}
      </div>
    </div>
  );
}

export default ShowTable;

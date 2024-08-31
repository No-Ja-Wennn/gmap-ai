import classNames from 'classnames/bind';
import styles from './VietNamMap.module.scss';
import images from '../../assets/images';
import { useEffect, useState } from 'react';
//  đang lỗi ~ chưa dùng được, dùng tạm ../

const cx = classNames.bind(styles);

// Kích thước của hình ảnh bản đồ
const mapWidth = 700;
const mapHeight = 700;

// Tọa độ GPS của các điểm biên

const topLeft = { lat: 24.200, long: 97.34 }; // Góc trên bên trái
const bottomRight = { lat: 7.812, long: 114.390 }; // Góc dưới bên phải

// const topLeft = { lat: 23.392, long: 102.144 }; // Góc trên bên trái
// const bottomRight = { lat: 8.412, long: 109.464 }; // Gó cdưới bên phải

// Hàm chuyển đổi tọa độ GPS sang tọa độ pixel
function convertGPSToPixel(lat, long) {
  const latRange = topLeft.lat - bottomRight.lat;
  const longRange = bottomRight.long - topLeft.long;

  const x = ((long - topLeft.long) / longRange) * mapWidth;
  const y = ((topLeft.lat - lat) / latRange) * mapHeight;

  return { x, y };
}

const VietNamMap = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/gmap/get/')
      .then((response) => response.json())
      .then((data) => { console.log(data); setLocations(data)})
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div className={cx('wrapper')}>
      <img className={cx('image')} src={images.vietNam} alt="" />
      {locations.map((location) => {
        const pixelCoords = convertGPSToPixel(location.lat, location.long);
        return (
          <div
            key={location.id}
            className={cx('marker')}
            style={{ top: `${pixelCoords.y}px`, left: `${pixelCoords.x}px` }}
          ></div>
        );
      })}
    </div>
  );
};

export default VietNamMap;

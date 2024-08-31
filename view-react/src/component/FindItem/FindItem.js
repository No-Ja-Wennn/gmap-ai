import classNames from "classnames/bind";
import styles from "./FindItem.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const cx = classNames.bind(styles)

function FindItem() {
    return <div className={cx('wrapper')}>
        <FontAwesomeIcon className={cx("icon")} icon={faClock}/>
        <span className={cx("text")}>66 Đường Bắc Sơn, Hàng Văn Thụ0, Thành phố Thái Nguyên, Thái Nguyên</span>
    </div>;
}

export default FindItem;
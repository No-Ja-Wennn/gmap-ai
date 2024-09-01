import classNames from "classnames/bind";
import styles from "./FindItem.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const cx = classNames.bind(styles)

function FindItem({name, handleSpanClick, id}) {
    return <div className={cx('wrapper')}>
        <FontAwesomeIcon className={cx("icon")} icon={faClock}/>
        <span onClick={()=>handleSpanClick(name, id)} className={cx("text")}>{name}</span>
    </div>;
}

export default FindItem;
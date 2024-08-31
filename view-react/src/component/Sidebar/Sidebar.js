import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faPersonWalking } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles)

function Sidebar() {
    return <div className={cx("wrapper")}>
        <FontAwesomeIcon className={cx("list-icon")} icon={faList}/>
        <ul className={cx("list")}>
          <li className={cx("items", " active")}>
            <FontAwesomeIcon className={cx("per-walking")} icon={faPersonWalking}/>
            <span className={cx("text")}>Way</span>
          </li>
          <li className={cx("items")}>
            <FontAwesomeIcon className={cx("per-walking")} icon={faPersonWalking}/>
            <span className={cx("text")}>Way</span>
          </li>
        </ul>
    </div>;
}

export default Sidebar;
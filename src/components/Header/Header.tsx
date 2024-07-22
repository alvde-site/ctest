import clsx from "clsx";
import { type FC } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";

const Header: FC = () => {
  return (
    <header className={clsx(styles.header)}>
      <Link to="/" className={clsx(styles.header__link)}>
        HOME
      </Link>
    </header>
  );
};
export default Header;

import clsx from "clsx";
import styles from "./Loader.module.scss";

export const Loader = () => {
  return <span className={clsx(styles.loader)}></span>;
};

import { useNavigate } from "react-router-dom";
import styles from "./PageNotFound.module.scss";
import clsx from "clsx";
import type { FC } from "react";
import { GO_BACK } from "../../utils/constants";

const PageNotFound: FC = () => {
  const navigate = useNavigate();
  function handleBack() {
    navigate(-1);
  }
  return (
    <div className={clsx(styles.notfound)}>
      <h3 className={clsx(styles.notfound__title)}>404</h3>
      <p className={clsx(styles.notfound__text)}>Page not found</p>
      <button className={clsx(styles.notfound__main)} onClick={handleBack}>
        {GO_BACK}
      </button>
    </div>
  );
};

export default PageNotFound;

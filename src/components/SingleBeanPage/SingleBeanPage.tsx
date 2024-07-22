import type { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectBeanById } from "../../app/reducers/beanSlice";
import styles from "./SingleBeanPage.module.scss";
import clsx from "clsx";
import { FUNNY_CATS, GO_BACK } from "../../utils/constants";

const SingleBeanPage: FC = () => {
  const { beanId } = useParams();
  const bean = useAppSelector(state => selectBeanById(state, beanId!));

  const navigate = useNavigate();
  function handleBack() {
    navigate(-1);
  }

  if (!bean) {
    return (
      <main>
        <h2 className={clsx(styles.bean__title)}>Cat not found by id!</h2>
        <button className={clsx(styles.bean__back)} onClick={handleBack}>
          {GO_BACK}
        </button>
      </main>
    );
  }

  return (
    <main>
      <article className={clsx(styles.bean)}>
        <h2 className={clsx(styles.bean__title)}>{FUNNY_CATS}</h2>
        <img src={bean.url} alt={FUNNY_CATS} />
        <button className={clsx(styles.bean__back)} onClick={handleBack}>
          {GO_BACK}
        </button>
      </article>
    </main>
  );
};
export default SingleBeanPage;

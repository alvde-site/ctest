import { useCallback, useRef, useEffect, useState, type FC } from "react";
import { fetchData } from "../../api/fetchData";
import clsx from "clsx";
import styles from "./Beans.module.scss";
import { Loader } from "../Loader/Loader";
import {
  selectAllBeans,
  selectOffset,
  selectTotalPages,
  setBeans,
  setOffset,
  setTotalPages,
  type TBean,
} from "../../app/reducers/beanSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Link } from "react-router-dom";
import { handleToElementScroll } from "../../utils/utils";
import { EXPLORE_ALL, FUNNY_CATS } from "../../utils/constants";

const Bean: FC<TBean> = ({ title, imageUrl, description, id }) => {
  const mainElement = document.getElementsByTagName("body");
  function moveToTop() {
    handleToElementScroll(mainElement[0]);
  }

  const isBroken = !imageUrl.length || !id;
  return (
    <li
      className={clsx(styles.card, {
        [styles.card_broken]: isBroken,
      })}
    >
      <Link to={`${id}`}>
        <div
          className={clsx(styles.card__item, {
            [styles.card_broken]: isBroken,
          })}
          onClick={moveToTop}
        >
          <h3 className={clsx(styles.card__title)}>{title}</h3>
          <img src={imageUrl} alt={id} className={clsx(styles.card__image)} />
          <p className={styles.card__description}>{description}</p>
        </div>
      </Link>
    </li>
  );
};

const Beans: FC = () => {
  const timesRender = useRef(0);
  const dispatch = useAppDispatch();
  const cats = useAppSelector(selectAllBeans);
  const [isLoading, setIsLoading] = useState(false);
  const totalPages = useAppSelector(selectTotalPages);
  const PORTION_OF_ITEMS = 12;
  const offset = useAppSelector(selectOffset);

  const fetchBeans = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    fetchData
      .getData(offset, PORTION_OF_ITEMS)
      .then(res => {
        dispatch(setBeans({ items: res }));
        dispatch(setOffset());
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  }, [dispatch, isLoading, offset]);

  //Initial fetch
  useEffect(() => {
    if (!timesRender.current && !cats.length) {
      timesRender.current = 1;
      dispatch(setBeans({ items: [] }));
      dispatch(setOffset());
      setIsLoading(true);
      fetchData
        .getData(offset, PORTION_OF_ITEMS)
        .then(res => {
          dispatch(setBeans({ items: res }));
          dispatch(setTotalPages({ totalPages: res.totalPages }));
          setIsLoading(false);
          setIsLoading(false);
        })
        .catch(err => {
          setIsLoading(false);
          console.log(err);
        });
    }
  }, [cats, dispatch, offset]);

  // scroll fetch
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        fetchBeans();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchBeans, offset, totalPages]);

  return (
    <main className={clsx(styles.main)}>
      <h2 className={clsx(styles.main__title)}>{EXPLORE_ALL}</h2>
      <ul className={clsx(styles.main__content, styles.content)}>
        {cats &&
          cats.map(e => (
            <Bean
              title={FUNNY_CATS}
              imageUrl={e.url}
              description={""}
              key={e.id}
              id={e.id}
            />
          ))}
      </ul>
      {isLoading && <Loader />}
    </main>
  );
};
export default Beans;

import { useCallback, useEffect, useRef, useState, type FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectBeanById } from "../../app/reducers/beanSlice";
import styles from "./SingleBeanPage.module.scss";
import clsx from "clsx";
import { GO_BACK } from "../../utils/constants";
import { Loader } from "../Loader/Loader";
import { fetchData } from "../../api/fetchData";

type TBreeds = [
  {
    [key: string]: any;
  },
];

export type TSingleData = {
  id: string;
  [key: string]: string | TBreeds | undefined;
  url: string;
  breeds?: TBreeds;
  categories: [{ id: string; name: string }];
};

const SingleBeanPage: FC = () => {
  const { beanId } = useParams();
  const bean = useAppSelector(state => selectBeanById(state, beanId!));
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TSingleData | null>(null);
  const timesRender = useRef(0);

  const fetchBeans = useCallback(async () => {
    if (isLoading) return;

    if (!timesRender.current && beanId) {
      timesRender.current = 1;
      setIsLoading(true);
      fetchData
        .getSingleData(beanId)
        .then(res => {
          setData(res);
          setIsLoading(false);
        })
        .catch(err => {
          setIsLoading(false);
          console.log(err);
        });
    }
  }, [beanId, isLoading]);

  // fetch
  useEffect(() => {
    if (beanId) {
      fetchBeans();
    }
  }, [beanId, fetchBeans]);

  const navigate = useNavigate();
  function handleBack() {
    navigate(-1);
  }

  if (!bean) {
    return (
      <main>
        <h2 className={clsx(styles.bean__title)}>Cat not found by id!</h2>
        <button className={clsx(styles.bean__back)} onClick={handleBack}>
          {GO_BACK}&#8594;
        </button>
      </main>
    );
  }

  return (
    <main>
      {!isLoading && (
        <article className={clsx(styles.bean)}>
          <h2 className={clsx(styles.bean__title)}>
            {data && data.breeds
              ? data.breeds[0].name
              : data?.categories
                ? data.categories[0].name
                : "Cat"}
          </h2>
          <img
            src={data && data.url ? data.url : bean.url}
            alt={data && data.breeds ? data.breeds[0].name : "Cat"}
          />
          <p className={clsx(styles.bean__description)}>
            {data && data.breeds ? data.breeds[0].description : ""}
          </p>
          {data && data.breeds && (
            <p className={clsx(styles.bean__item)}>
              {`Origin: ${data.breeds[0].origin}`}
            </p>
          )}
          {data && data.breeds && (
            <p className={clsx(styles.bean__item)}>
              {`Life span: ${data.breeds[0].life_span} years`}
            </p>
          )}
          {data && data.breeds && (
            <p className={clsx(styles.bean__item)}>
              {`Temperament: ${data.breeds[0].temperament}`}
            </p>
          )}
          {data && data.breeds && (
            <p className={clsx(styles.bean__item)}>
              {`Wikipedia: ${data && data.breeds[0].wikipedia_url}`}
            </p>
          )}
          <button className={clsx(styles.bean__back)} onClick={handleBack}>
            {GO_BACK}&#8594;
          </button>
        </article>
      )}

      {isLoading && <Loader />}
    </main>
  );
};
export default SingleBeanPage;

import clsx from "clsx";
import { useEffect, useRef, useState, type FC } from "react";
import style from "./Home.module.scss";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Footer from "../Footer/Footer";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectAllBeans,
  selectOffset,
  setBeans,
  setOffset,
} from "../../app/reducers/beanSlice";
import { fetchData } from "../../api/fetchData";
import { EXPLORE } from "../../utils/constants";

const Home: FC = () => {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const header = useRef(null);
  const tl = useRef(gsap.timeline());

  const timesRender = useRef(0);
  const dispatch = useAppDispatch();
  const beans = useAppSelector(selectAllBeans);
  const PORTION_OF_ITEMS = 12;
  const offset = useAppSelector(selectOffset);

  //Initial fetch
  useEffect(() => {
    if (!timesRender.current && !beans.length) {
      timesRender.current = 1;
      dispatch(setBeans({ items: [] }));
      dispatch(setOffset());
      fetchData
        .getData(offset, PORTION_OF_ITEMS)
        .then(res => {
          dispatch(setBeans({ items: res }));
          navigate("/beans");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [beans.length, dispatch, navigate, offset]);

  useEffect(() => {
    if (!isHover) {
      tl.current.play();
    }
    if (isHover) {
      tl.current.pause(0);
    }
  }, [isHover]);

  useGSAP(() => {
    tl.current.to(header.current, {
      opacity: 0.2,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
    });
  });
  return (
    <>
      <header></header>
      <main>
        <section className={clsx(style.beans)}>
          <Link to="/beans">
            <h1
              className={clsx(style.beans__title)}
              ref={header}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              {EXPLORE}
            </h1>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
};
export default Home;

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Beans from "./components/Beans/Beans";
import SingleBeanPage from "./components/SingleBeanPage/SingleBeanPage";
import Home from "./components/Home/Home";
import Template from "./templates_pages/Template";
import PageNotFound from "./components/PageNotFound/PageNotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Template />}>
          <Route path="/beans" element={<Beans />} />
          <Route path="/beans/:beanId" element={<SingleBeanPage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

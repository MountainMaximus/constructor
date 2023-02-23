import { Routes, Route } from "react-router-dom";
import React from "react";
import { Wrapper } from "./layout/Wrapper";
import { HomePage } from "./pages/HomePage";
import { fetchData } from "./redux/frame/asyncAction";
import { useAppDispatch } from "./redux/store";
import { Preloader } from "./layout/Preloader";

export function App() {
  const dispatch = useAppDispatch();
  const [loadActive, setLoadActive] = React.useState(true);
  React.useEffect(() => {
    dispatch(fetchData());
    setLoadActive(false);
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path="/"
        element={loadActive ? <Preloader mask={true} /> : <Wrapper />}
      >
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

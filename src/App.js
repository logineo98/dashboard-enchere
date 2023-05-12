import { useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./libs/css/style.scss"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { PrivateRoute, auth } from "./libs";
import Login from "./pages/auth/Login";
import Layout from "./layout";
import { VitepayCancel, VitepayDecline, VitepaySuccess } from "./pages";



function App() {

  const dispatch = useDispatch();
  const { isAuth, loading, } = useSelector(state => state?.user);

  useEffect(() => {
    dispatch(auth())
  }, [dispatch]);




  return (
    <HashRouter>
      <Routes>
        <Route exact path='*' element={<PrivateRoute auth={isAuth} loading={loading} />}>
          <Route path="*" element={<Layout />} />
        </Route>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/success' element={<VitepaySuccess />} />
        <Route exact path='/cancel' element={<VitepayCancel />} />
        <Route exact path='/decline' element={<VitepayDecline />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

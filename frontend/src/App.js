
import {  Routes, Route ,  useLocation , useParams } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NoPage from "./pages/NoPage";
import Header from "./pages/Header"
import OurImpact from "./pages/OurImpact";
import Shop from "./pages/Shop";
import SignUp from "./pages/SignUp"
import { gapi } from "gapi-script";
import { useEffect } from "react";
import PrivateRoutes from "./utils/PrivateRoutes";
import SignIn from "./pages/SignIn";
import ResetPassword from "./pages/ResetPasswordPassword";
import ForgetPassword from "./pages/ForgetPassword";




function App() {
 
  let path = useLocation();

 
  const start = () => {
    gapi.client.init({
      clientId:'649174600845-kq21q9vaq6sseovhea6ptcq3lbad47am.apps.googleusercontent.com',
      scope:""
    })
  }
  useEffect(() => {
   gapi.load('client:auth2',start)
  }, []);
  
 
  return (
    <>

   {path?.pathname !== '/signUp' && path?.pathname !== '/logIn'   && path?.pathname !== '/forgetPassword' && !path?.pathname.includes('/resetPassword/') && <Header />}
      <Routes>
          <Route path="/" element={<Home />} />

          {/* protected routing */}
          <Route element={<PrivateRoutes />}>
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/ourImpact" element={<OurImpact />} />
          </Route>
          
          <Route path="/signUp" element={<SignUp />}/>
          <Route path="/logIn" element={<SignIn />}/>
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
}

export default App;

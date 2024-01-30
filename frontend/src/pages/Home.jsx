import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Home = () => {

  const displayMessage = async () => {
    let items = await localStorage.getItem('signUp');
  
    if (items === 'signUp Sucessful') {
      await toast.success("SignUp Sucessful", {
        icon: false
      })
    }
    items = localStorage.removeItem('signUp')


    // display message if log in sucessful
    let signInIems = await localStorage.getItem('logIn');
   
    if (signInIems === 'logIn Sucessful') {
      await toast.success("Login Sucessful", {
        icon: false
      })
    }
    items = localStorage.removeItem('logIn')
  }
  displayMessage()

  return (
    <div style={{ backgroundColor: "white" }}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <h1>Home Page hhhhh </h1>
    </div>
  );
}

export default Home;

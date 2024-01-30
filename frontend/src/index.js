import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import { gapi } from 'gapi-script';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <BrowserRouter> <App /></BrowserRouter>
  //   <React.StrictMode>
  // </React.StrictMode>
);


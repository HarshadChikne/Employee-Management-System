import {ToastContainer} from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Footer from "./components/Footer";
import './App.css';
import EmployeeList from "./components/EmployeeList";
import CreateEmployee from "./components/CreateEmployee";
import UpdateEmployee from "./components/UpdateEmployee";

function PrivateRoute({children})
{
  return localStorage.getItem("logged") ? children:<Navigate to={"/login"}/>
}

function App() {
  return (
    <div >
    <BrowserRouter>
      <Header />

      <Routes>

        <Route exact path="/login" element={<Login />} />
        {/*Protected pages*/}
        <Route path="/" element={<PrivateRoute><EmployeeList/></PrivateRoute>}/>
        <Route path="/add-emp" element={<PrivateRoute><CreateEmployee/></PrivateRoute>}/>
        <Route path="/edit-emp/:id" element={<PrivateRoute><UpdateEmployee/></PrivateRoute>}/>
      </Routes>

      <Footer/>
    </BrowserRouter>

    <ToastContainer />
    </div>
  );
}

export default App;
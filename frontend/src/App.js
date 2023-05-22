import "./App.css";
import VoidPage from "./components/404";
import Audit from "./components/Audit";
import Auth from "./components/Auth";
import Index from "./components/Index";
import MasterData from "./components/MasterData";
import MasterForm from "./components/MasterForm";
import SearchResult from "./components/SearchResult";
import Vendors from "./components/Vendors";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import AuditDetails from "./components/AuditDetails"

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/bootstrap/css/bootstrap.min.css";
import "./assets/fonts/fontawesome-all.min.css";
import "./assets/fonts/font-awesome.min.css";
import "./assets/fonts/fontawesome5-overrides.min.css";
import "./assets/css/Login-Form-Clean.css";

function App() {
  return (

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}></Route>
          <Route path="/vendors" element={<Vendors />}></Route>
          <Route path="/search-result" element={<SearchResult />}></Route>
          <Route path="/master-data" element={<MasterData />}></Route>
          <Route path="/master-data-form" element={<MasterForm />}></Route>
          <Route path="/authen" element={<Auth />}></Route>
          <Route path="/audit" element={<Audit />}></Route>
          <Route path="/authen/sign-in" element={<SignIn/>}></Route>
          <Route path="/authen/sign-up" element={<SignUp/>}></Route>
          <Route path="/audit-details" element={<AuditDetails/>}></Route>
          <Route path="*" element={<VoidPage />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
// <div className="App">
//   <BrowserRouter>
//     <header className="App-header" />
//     <Routes>
//       <Route path="/" element={<Index />}></Route>
//       <Route path="/vendors" element={<Vendors />}></Route>
//       <Route path="/search-result" element={<SearchResult />}></Route>
//       <Route path="/master-data" element={<MasterData />}></Route>
//       <Route path="/auth" element={<Auth />}></Route>
//       <Route path="/audit" element={<Audit />}></Route>
//       {/* <Route path="*" element={<VoidPage />}></Route> */}
//     </Routes>
//   </BrowserRouter>
// </div>

// import AdminPanel from "./components/AdminPanel.jsx";
// import UserPanel from "./components/UserPanel.jsx";
// import Login from "./components/Login.jsx";
// import { BrowserRouter,Route,Routes } from "react-router-dom";
// import Home from "./components/Home.jsx";

// function App() {
//   return (
//     <BrowserRouter>
//     <div className="App">
//         <header className="App-header"/>

//   <Routes>
//   <Route path = "/user" element={<UserPanel/>}></Route>
//         <Route path = "/admin" element={<AdminPanel/>}></Route>
//         <Route path = "/login" element={<Login/>}></Route>
//          <Route path = "/" element={<Home/>}></Route>
//         {/* <Route path="*" element={<NoPage />} /> */}

//         </Routes>

//     </div>
//     </BrowserRouter>
//   );
// }

// export default App;

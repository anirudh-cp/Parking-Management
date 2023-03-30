import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NoPage from "./components/common/NoPage";
import Header from "./components/common/Header"
import Footer from './components/common/Footer';

import RequireAuth from "./components/common/RequireAuth";
import RequireData from "./components/common/RequireData";

import Login from './pages/Login'
import UserSignIn from './pages/UserSignIn'

import UserDash from "./pages/UserDash";
import AdminDash from "./pages/AdminDash";


function App() {
    return (
        <div style={{ "overflow": "hidden", "display": "flex", "flexDirection": "column" }}>

            <Router>
                <Header />
                <Routes>
                    <Route exact path="/" element={<UserSignIn />}></Route>
                    <Route exact path="/admin" element={<Login />}></Route>
                    
                    {/* Routes that require authentication to proceed */}

                    <Route exact path="/dash" element={<RequireData> <UserDash /> </RequireData>}></Route>
                    <Route exact path="/control" element={<RequireAuth> <AdminDash /> </RequireAuth>}></Route>
                    
                    <Route path="*" element={<NoPage />}></Route>
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;

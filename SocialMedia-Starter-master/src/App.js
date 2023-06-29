import "./App.css"
import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import Auth from "./pages/Auth/Auth";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Chat from "./pages/Chat/Chat";
function App() {
  const user = useSelector((state) => state.authReducer.authData)
  return (

    <div className="App">
      <div className="blur" style={{ top: '-18%', right: '0' }}></div>
      <div className="blur" style={{ top: '36%', left: '-8rem' }}></div>
      <Routes>
        <Route path="/" element={user ? <Navigate to="home" /> : <Navigate
          to="auth" />}></Route>
        <Route path="/home" element={user ? <Home /> : <Navigate
          to="../auth" />}></Route>
        <Route path="/auth" element={user ? <Navigate to="../home" /> : <Auth />}></Route>
        <Route path='/profile/:id' element={user ? <Profile /> : <Navigate to='../auth' />}></Route>
      <Route path="/chat" element={user ? <Chat /> : <Navigate to="../auth" />}></Route>
      </Routes>
    </div>
  );
}

export default App;

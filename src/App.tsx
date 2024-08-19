import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import { ProtectedRoute } from "./shared/ProtectedRoute";
import List from "./components/Products/List";
import SignUp from "./components/Signup/Signup";


function App() {
  
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route element={<ProtectedRoute/>} >
          <Route path="/home" element={<List/>} />
        </Route>
        
      </Routes>
    </Router>
  )
}

export default App

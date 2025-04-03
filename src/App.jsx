import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes"; 
import Navbar from "./components/NavBar"; 
import "./App.css"; 

function App() {
  return (
      <div className="App">
        <Navbar /> 
        <h1>My News App</h1>
        <AppRoutes /> 
      </div>
  );
}

export default App;
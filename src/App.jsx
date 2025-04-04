import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import { useEffect, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

function App() {

  // Initial Loader
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ready = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(ready);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ArrowPathIcon className="w-8 h-8 text-blue-500 animate-spin" />
        <h1 className='text-blue-500'>Loading...</h1>
      </div>
    );
  }

  //App Routes
  return (
    
      <div className="min-h-screen bg-gray-100">
        <Router>
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/user/:id" element={<UserDetails />} />
          </Routes>
        </Router>
      </div>
   
  );
}

export default App;

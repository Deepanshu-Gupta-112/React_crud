import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Createuser } from "./components/Createuser";
import { Deleteuser } from "./components/Deleteuser";
import { Home } from "./components/Home";
import { Updateuser } from "./components/Updateuser";
import { Navbar } from "./components/Navbar";
import { ErrorComponent } from "./components/ErrorComponent";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const user_data = await response.json();
        console.log(user_data);
        setData(user_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home data={data} />} />
        <Route
          path="create_user"
          element={<Createuser data={data} setData={setData} />}
        />
        <Route
          path="delete_user"
          element={<Deleteuser data={data} setData={setData} />}
        />
        <Route
          path="update_user"
          element={<Updateuser data={data} setData={setData} />}
        />
        <Route path="*" element={<ErrorComponent />} />
      </Routes>
    </div>
  );
}

export default App;

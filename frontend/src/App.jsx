import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data/');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Data from Backend</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name} - {item.email} - {item.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

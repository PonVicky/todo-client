import axios from "axios";
import React, { useEffect, useState } from "react";

function TestAPI() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return <div>{data ? data.message : "Loading..."}</div>;
}

export default TestAPI;

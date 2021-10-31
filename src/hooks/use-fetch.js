import { useState, useEffect } from "react";

const useFetch = ({ url, method, body = null, headers = null }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    fetch(url, {
      headers: JSON.stringify(headers),
      method: method,
      body: JSON.stringify(body),
    })
      .then((res) => {
        res.json().then((data) => {
          setResponse(data);
        });
      })
      .catch((err) => setError(err.message));
  };

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

  return {
    fetchData,
    response,
    error,
    loading,
  };
};

export default useFetch;

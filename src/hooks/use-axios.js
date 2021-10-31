import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = ({ url, method, body = null, headers = null }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    axios[method](url, JSON.stringify(headers), JSON.stringify(body))
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    fetchData,
    response,
    error,
    loading,
  };
};

export default useAxios;

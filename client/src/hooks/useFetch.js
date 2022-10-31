import { useEffect, useState } from "react";

const useFetch = (url, method = "GET") => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  const postData = (data) => {
    setOptions({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async (fetchOptions) => {
      setIsPending(true);
      try {
        const res = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
        });

        const dataFromJson = await res.json();
        console.log({ dataFromJson });
        if (!res.ok) {
          throw new Error(dataFromJson.msg);
        }
        setIsPending(false);
        setData(dataFromJson);
        setError(null);
      } catch (err) {
        if (err.name === "Aborterror") {
          console.log("fetch was aborted");
        } else {
          setIsPending(false);
          setError(err);
          console.log(err.message);
        }
      }
    };
    if (!options) {
      //console.log("GET");
      fetchData();
    }
    if (options) {
      fetchData(options);
    }
    return () => {
      controller.abort();
    };
  }, [method, options, url]);

  return { data, isPending, error, postData };
};

export default useFetch;

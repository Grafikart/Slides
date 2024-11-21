import {useEffect, useState} from "react";

export function useFetch(url: string, fetcher = fetch) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  useEffect(() => {
    fetcher(url).then(r => r.json()).then(d => {
      setData(d)
      setLoading(false)
    })
  }, [url]);

  return {
    data, loading
  }
}

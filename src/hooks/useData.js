import { useEffect, useState } from "react"


export function useData(url) {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const fetchData = async (url) => {
      const response = await fetch(url)
      const parsedResponse = await response.json()
      setChartData(parsedResponse)
    }

    fetchData(url)
  }, [])

  return chartData;
}


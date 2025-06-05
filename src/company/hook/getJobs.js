import { useState, useEffect } from "react"
import axios from "axios"

export const useGetJobs = (companyId) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchJobs = async () => {
    if (!companyId) return

    setLoading(true)
    setError(null)

    try {
      // Replace with your actual API endpoint
      const response = await axios.get(`/api/jobs?companyId=${companyId}`)
      setData(response.data)
    } catch (err) {
      setError(err)
      console.error("Error fetching jobs:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [companyId])

  const refetch = () => {
    fetchJobs()
  }

  return {
    data,
    loading,
    error,
    refetch,
  }
}

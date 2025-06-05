import { useState, useEffect } from "react"
import JobForm from "./JobForm"
import { useGetJobs } from "../hook/getJobs"

const JobList = ({ companyId, showJobForm }) => {
  const [editingJob, setEditingJob] = useState(null)
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
  })

  const { data: jobs = [], loading, error, refetch } = useGetJobs(companyId)
  const [localJobs, setLocalJobs] = useState([])

  useEffect(() => {
    if (jobs.length > 0) {
      setLocalJobs(jobs)
    }
  }, [jobs])

  const handleEdit = (job) => {
    setEditingJob(job)
    setJobData({
      title: job.title,
      description: job.description,
      salary: job.salary,
      location: job.location,
    })
  }

  const handleDelete = (jobId) => {
    setLocalJobs(localJobs.filter((job) => job.id !== jobId))
  }

  const handleJobSubmit = (e) => {
    e.preventDefault()

    if (editingJob) {
      setLocalJobs(localJobs.map((job) => (job.id === editingJob.id ? { ...job, ...jobData } : job)))
      setEditingJob(null)
    } else {
      const newJob = {
        id: Math.max(...localJobs.map((j) => j.id)) + 1,
        ...jobData,
        companyId: companyId,
      }
      setLocalJobs([...localJobs, newJob])
    }

    setJobData({
      title: "",
      description: "",
      salary: "",
      location: "",
    })
  }

  const handleInputChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value })
  }

  if (!showJobForm) {
    return <p>Chưa có công việc nào.</p>
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải dữ liệu...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 mb-4">Có lỗi xảy ra khi tải dữ liệu: {error.message}</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Danh sách công việc ({localJobs?.length})</h2>
      <JobForm
        jobData={jobData}
        handleJobSubmit={handleJobSubmit}
        handleInputChange={handleInputChange}
        editingJob={editingJob}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {localJobs?.map((job) => (
          <JobItem key={job.id} job={job} handleEdit={handleEdit} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  )
}

export default JobList

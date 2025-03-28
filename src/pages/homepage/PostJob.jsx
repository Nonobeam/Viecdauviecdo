import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/Checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/RadioGroup"
import { Label } from "@/components/Label"
import { ArrowLeft } from "lucide-react"

const PostJob = () => {
  const [jobTitle, setJobTitle] = useState("Senior Frontend Developer")
  const [positions, setPositions] = useState("2")
  const [salaryMin, setSalaryMin] = useState("20,000")
  const [salaryMax, setSalaryMax] = useState("30,000")
  const [deadline, setDeadline] = useState("")
  const [location, setLocation] = useState("San Francisco")
  const [workType, setWorkType] = useState("onsite")
  const [description, setDescription] = useState("")
  const [requirements, setRequirements] = useState("")
  const [benefits, setBenefits] = useState("")
  const [department, setDepartment] = useState("")
  const [experience, setExperience] = useState("3-5")
  const [skills, setSkills] = useState("")
  const [education, setEducation] = useState("")
  const [applicationProcess, setApplicationProcess] = useState("")
  const [companyOverview, setCompanyOverview] = useState("")
  const [isUrgent, setIsUrgent] = useState(false)
  const [isRemoteAllowed, setIsRemoteAllowed] = useState(false)

  return (
    <div className="min-h-screen bg-background ">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Post Job Listing</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Job Title */}
          <div>
            <label htmlFor="jobTitle" className="block font-medium mb-2">
              Job Title
            </label>
            <Input
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Senior Frontend Developer"
            />
          </div>

          {/* Department */}
          <div>
            <label htmlFor="department" className="block font-medium mb-2">
              Department
            </label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="hr">Human Resources</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Number of Positions */}
          <div>
            <label htmlFor="positions" className="block font-medium mb-2">
              Number of Positions
            </label>
            <Input
              id="positions"
              type="number"
              value={positions}
              onChange={(e) => setPositions(e.target.value)}
              min="1"
            />
          </div>

          {/* Application Deadline */}
          <div>
            <label htmlFor="deadline" className="block font-medium mb-2">
              Application Deadline
            </label>
            <Input id="deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          </div>

          {/* Salary Range */}
          <div>
            <label className="block font-medium mb-2">Salary Range (USD)</label>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Min"
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)}
                className="w-full"
              />
              <span>-</span>
              <Input
                placeholder="Max"
                value={salaryMax}
                onChange={(e) => setSalaryMax(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <label htmlFor="experience" className="block font-medium mb-2">
              Experience Level
            </label>
            <Select value={experience} onValueChange={setExperience}>
              <SelectTrigger>
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                <SelectItem value="3-5">Mid Level (3-5 years)</SelectItem>
                <SelectItem value="5-8">Senior Level (5-8 years)</SelectItem>
                <SelectItem value="8+">Expert Level (8+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Work Location */}
          <div>
            <label htmlFor="location" className="block font-medium mb-2">
              Work Location
            </label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. San Francisco, CA"
            />
          </div>

          {/* Work Arrangement */}
          <div>
            <label className="block font-medium mb-2">Work Arrangement</label>
            <RadioGroup value={workType} onValueChange={setWorkType} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="onsite" id="onsite" />
                <Label htmlFor="onsite">Onsite</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hybrid" id="hybrid" />
                <Label htmlFor="hybrid">Hybrid</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="remote" id="remote" />
                <Label htmlFor="remote">Remote</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Additional Options */}
          <div className="md:col-span-2 flex flex-wrap gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox id="urgent" checked={isUrgent} onCheckedChange={setIsUrgent} />
              <label htmlFor="urgent">Mark as urgent hiring</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remote" checked={isRemoteAllowed} onCheckedChange={setIsRemoteAllowed} />
              <label htmlFor="remote">Open to remote candidates worldwide</label>
            </div>
          </div>

          {/* Required Skills */}
          <div className="md:col-span-2">
            <label htmlFor="skills" className="block font-medium mb-2">
              Required Skills
            </label>
            <Textarea
              id="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="List key skills required for this position (e.g. React, TypeScript, Node.js)"
              rows={3}
            />
          </div>

          {/* Job Description */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block font-medium mb-2">
              Job Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed description of the role, responsibilities, and day-to-day activities"
              rows={6}
            />
          </div>

          {/* Candidate Requirements */}
          <div className="md:col-span-2">
            <label htmlFor="requirements" className="block font-medium mb-2">
              Candidate Requirements
            </label>
            <Textarea
              id="requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="Describe the qualifications, experience, and attributes you're looking for in candidates"
              rows={6}
            />
          </div>

          {/* Education Requirements */}
          <div className="md:col-span-2">
            <label htmlFor="education" className="block font-medium mb-2">
              Education Requirements
            </label>
            <Textarea
              id="education"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder="Specify any education requirements or preferences"
              rows={3}
            />
          </div>

          {/* Benefits */}
          <div className="md:col-span-2">
            <label htmlFor="benefits" className="block font-medium mb-2">
              Benefits & Perks
            </label>
            <Textarea
              id="benefits"
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              placeholder="List the benefits, perks, and advantages of working at your company"
              rows={4}
            />
          </div>

          {/* Company Overview */}
          <div className="md:col-span-2">
            <label htmlFor="companyOverview" className="block font-medium mb-2">
              Company Overview
            </label>
            <Textarea
              id="companyOverview"
              value={companyOverview}
              onChange={(e) => setCompanyOverview(e.target.value)}
              placeholder="Provide a brief overview of your company, culture, and mission"
              rows={4}
            />
          </div>

          {/* Application Process */}
          <div className="md:col-span-2">
            <label htmlFor="applicationProcess" className="block font-medium mb-2">
              Application Process
            </label>
            <Textarea
              id="applicationProcess"
              value={applicationProcess}
              onChange={(e) => setApplicationProcess(e.target.value)}
              placeholder="Describe the application and interview process for this position"
              rows={3}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <Button variant="outline">Preview</Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700">Post Job</Button>
        </div>
      </div>
    </div>
  )
}

export default PostJob
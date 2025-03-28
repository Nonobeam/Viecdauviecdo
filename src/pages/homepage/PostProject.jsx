import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/config"

const PostProject = () => {
  const navigate = useNavigate();
  
  const [projectName, setProjectName] = useState("")
  const [projectValue, setProjectValue] = useState("100,000,000")
  const [estimatedTime, setEstimatedTime] = useState("6")
  const [category, setCategory] = useState("")
  const [requirements, setRequirements] = useState("")
  const [teamSize, setTeamSize] = useState("5-10")
  const [deadline, setDeadline] = useState("")

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Post New Project</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Project Name */}
          <div>
            <label htmlFor="projectName" className="block font-medium mb-2">
              Project Name
            </label>
            <Input
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
            />
          </div>

          {/* Project Deadline */}
          <div>
            <label htmlFor="deadline" className="block font-medium mb-2">
              Project Deadline
            </label>
            <Input id="deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          </div>

          {/* Project Value */}
          <div>
            <label htmlFor="projectValue" className="block font-medium mb-2">
              Project Value (USD)
            </label>
            <Input
              id="projectValue"
              value={projectValue}
              onChange={(e) => setProjectValue(e.target.value)}
              placeholder="Enter project budget"
            />
          </div>

          {/* Team Size */}
          <div>
            <label htmlFor="teamSize" className="block font-medium mb-2">
              Team Size
            </label>
            <Select value={teamSize} onValueChange={setTeamSize}>
              <SelectTrigger>
                <SelectValue placeholder="Select team size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-2">1-2 people</SelectItem>
                <SelectItem value="3-5">3-5 people</SelectItem>
                <SelectItem value="5-10">5-10 people</SelectItem>
                <SelectItem value="10+">10+ people</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Estimated Time */}
          <div>
            <label htmlFor="estimatedTime" className="block font-medium mb-2">
              Estimated Duration
            </label>
            <div className="flex items-center">
              <Input
                id="estimatedTime"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
                className="w-20 mr-2"
              />
              <Select defaultValue="months">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="days">Days</SelectItem>
                  <SelectItem value="weeks">Weeks</SelectItem>
                  <SelectItem value="months">Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Project Category */}
          <div>
            <label htmlFor="category" className="block font-medium mb-2">
              Project Category
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web">Web Development</SelectItem>
                <SelectItem value="mobile">Mobile App</SelectItem>
                <SelectItem value="design">UI/UX Design</SelectItem>
                <SelectItem value="marketing">Digital Marketing</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Project Requirements - Full Width */}
          <div className="md:col-span-2">
            <label htmlFor="requirements" className="block font-medium mb-2">
              Project Requirements
            </label>
            <Textarea
              id="requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="Describe your project requirements"
              rows={6}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <Button variant="outline cursor-pointer">Preview</Button>
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer" 
            onClick={() => navigate(ROUTES.index)}>Post Project</Button>
        </div>
      </div>
    </div>
  )
}

export default PostProject
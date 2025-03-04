import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ProjectDetails = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>DT</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">Digital Transformation Initiative</h1>
                <p className="text-muted-foreground">Enterprise Software Development Project</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">Contact Team</Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700">Apply to Join</Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList>
                <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                <TabsTrigger value="requirements">Yêu cầu</TabsTrigger>
                <TabsTrigger value="timeline">Thời gian</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Overview Section */}
            <section className="space-y-6">
              <h2 className="text-xl font-semibold">Tổng quan về dự án</h2>
              <p className="text-muted-foreground">
                A comprehensive digital transformation project aimed at modernizing enterprise systems and improving
                operational efficiency through innovative software solutions.
              </p>

              {/* Project Details Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Project Value</h3>
                  <p className="text-muted-foreground">$3.5M - $5M</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Team Size</h3>
                  <p className="text-muted-foreground">15-20 members</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Location</h3>
                  <p className="text-muted-foreground">Remote (Global)</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Duration</h3>
                  <p className="text-muted-foreground">18 months</p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Company Details */}
            <section className="border rounded-lg p-6 space-y-4">
              <h2 className="text-lg font-semibold">Company Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">TechCorp Solutions</h3>
                  <p className="text-sm text-muted-foreground">Enterprise Software Development</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Company Size</p>
                  <p className="text-sm">500-1000 employees</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Founded</p>
                  <p className="text-sm">2010</p>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="border rounded-lg p-6 space-y-4">
              <h2 className="text-lg font-semibold">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Project Lead</p>
                  <p className="text-sm">Sarah Chen</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-sm">projects@techcorp.com</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-sm">San Francisco, CA</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const CompanyProfile = () => {
  const { id } = useParams();

  const fetchCompanyData = async (companyId) => {
    console.log(`Fetching data for company ID: ${companyId}`);
  };

  useEffect(() => {
    if (id) {
      fetchCompanyData(id);
    }
  }, [id]);
  
  const jobTypes = ["All", "Full-time", "Remote"]
  const jobs = [
    {
      title: "Senior Frontend Developer",
      location: "San Francisco",
      type: "Full-time",
      salary: "$120-160K",
      deadline: "2024-02-28",
    },
    {
      title: "Product Designer",
      location: "Worldwide",
      type: "Remote",
      salary: "$80-120K",
      deadline: "2024-03-15",
    },
  ]

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>TC</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">TechCorp Solutions</h1>
            <p className="text-muted-foreground">Software Development & IT Services</p>
          </div>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">Follow Company</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Content */}
        <div className="md:col-span-2 space-y-8">
          {/* About Us */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">About Us</h2>
            <p className="text-muted-foreground">
              TechCorp Solutions is a leading software development company specializing in enterprise solutions and
              digital transformation. With over a decade of experience, we help businesses leverage cutting-edge
              technology to drive growth and innovation.
            </p>
          </section>

          {/* Company Details Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-1">Company Size</h3>
              <p className="text-muted-foreground">500-1000 employees</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Industry</h3>
              <p className="text-muted-foreground">Information Technology</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Founded</h3>
              <p className="text-muted-foreground">2010</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Location</h3>
              <p className="text-muted-foreground">San Francisco, CA</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <Button variant="outline" size="sm">
              Website
            </Button>
            <Button variant="outline" size="sm">
              LinkedIn
            </Button>
            <Button variant="outline" size="sm">
              Twitter
            </Button>
          </div>

          {/* Open Positions */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold">Open Positions</h2>

            {/* Job Type Filters */}
            <div className="flex gap-2">
              {jobTypes.map((type) => (
                <Badge key={type} variant={type === "All" ? "default" : "secondary"} className="cursor-pointer">
                  {type}
                </Badge>
              ))}
            </div>

            {/* Job Listings */}
            <div className="space-y-4">
              {jobs.map((job, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">{job.title}</h3>
                      <p className="text-muted-foreground">{job.location}</p>
                    </div>
                    <Button className="bg-indigo-600 hover:bg-indigo-700">Apply Now</Button>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <Badge variant="secondary">{job.type}</Badge>
                    <span>{job.salary}</span>
                    <span>Deadline: {job.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Thông tin liên lạc</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-muted-foreground">123 Tech Street</p>
                <p className="text-muted-foreground">San Francisco, CA 94105</p>
              </div>
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground">careers@techcorp.com</p>
              </div>
            </div>
          </section>

          {/* Key Clients */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Key Clients</h2>
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-video bg-muted rounded-lg" />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default CompanyProfile;
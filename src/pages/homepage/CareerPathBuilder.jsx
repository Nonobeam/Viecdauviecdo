"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  Trash2,
  Save,
  Download,
  Share2,
  HelpCircle,
  X,
  ChevronRight,
  Zap,
  Award,
  BookOpen,
  Code,
  Database,
  Server,
  Cpu,
  Layers,
  PenTool,
  LineChart,
  Users,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const skillCategories = [
  {
    name: "Lập Trình",
    icon: <Code className="w-4 h-4" />,
    skills: [
      { id: "javascript", name: "JavaScript", color: "bg-yellow-100 text-yellow-700", icon: <Code /> },
      { id: "react", name: "React", color: "bg-blue-100 text-blue-700", icon: <Code /> },
      { id: "python", name: "Python", color: "bg-green-100 text-green-700", icon: <Code /> },
      { id: "nodejs", name: "Node.js", color: "bg-green-100 text-green-700", icon: <Server /> },
      { id: "typescript", name: "TypeScript", color: "bg-blue-100 text-blue-700", icon: <Code /> },
    ],
  },
  {
    name: "Cơ Sở Dữ Liệu",
    icon: <Database className="w-4 h-4" />,
    skills: [
      { id: "sql", name: "SQL", color: "bg-orange-100 text-orange-700", icon: <Database /> },
      { id: "mongodb", name: "MongoDB", color: "bg-green-100 text-green-700", icon: <Database /> },
      { id: "postgresql", name: "PostgreSQL", color: "bg-blue-100 text-blue-700", icon: <Database /> },
    ],
  },
  {
    name: "Cloud & DevOps",
    icon: <Server className="w-4 h-4" />,
    skills: [
      { id: "aws", name: "AWS", color: "bg-orange-100 text-orange-700", icon: <Server /> },
      { id: "docker", name: "Docker", color: "bg-blue-100 text-blue-700", icon: <Layers /> },
      { id: "kubernetes", name: "Kubernetes", color: "bg-blue-100 text-blue-700", icon: <Layers /> },
      { id: "ci-cd", name: "CI/CD", color: "bg-purple-100 text-purple-700", icon: <Zap /> },
    ],
  },
  {
    name: "Kỹ Năng Mềm",
    icon: <Users className="w-4 h-4" />,
    skills: [
      { id: "leadership", name: "Leadership", color: "bg-purple-100 text-purple-700", icon: <Users /> },
      { id: "communication", name: "Communication", color: "bg-pink-100 text-pink-700", icon: <Users /> },
      { id: "problem-solving", name: "Problem Solving", color: "bg-indigo-100 text-indigo-700", icon: <Zap /> },
    ],
  },
]

const positionCategories = [
  {
    name: "Phát Triển",
    icon: <Code className="w-4 h-4" />,
    positions: [
      { id: "junior-dev", name: "Junior Developer", color: "bg-indigo-600", icon: <Code /> },
      { id: "mid-dev", name: "Mid-level Developer", color: "bg-indigo-600", icon: <Code /> },
      { id: "senior-dev", name: "Senior Developer", color: "bg-indigo-600", icon: <Code /> },
      { id: "tech-lead", name: "Tech Lead", color: "bg-indigo-600", icon: <Zap /> },
    ],
  },
  {
    name: "Quản Lý",
    icon: <Users className="w-4 h-4" />,
    positions: [
      { id: "team-lead", name: "Team Lead", color: "bg-purple-600", icon: <Users /> },
      { id: "engineering-manager", name: "Engineering Manager", color: "bg-purple-600", icon: <Users /> },
      { id: "cto", name: "CTO", color: "bg-purple-600", icon: <Briefcase /> },
    ],
  },
  {
    name: "Chuyên Môn",
    icon: <Award className="w-4 h-4" />,
    positions: [
      { id: "frontend-specialist", name: "Frontend Specialist", color: "bg-blue-600", icon: <PenTool /> },
      { id: "backend-specialist", name: "Backend Specialist", color: "bg-green-600", icon: <Server /> },
      { id: "devops-engineer", name: "DevOps Engineer", color: "bg-orange-600", icon: <Cpu /> },
      { id: "data-scientist", name: "Data Scientist", color: "bg-yellow-600", icon: <LineChart /> },
    ],
  },
]

const CareerPathBuilder = () => {
  // Flatten skill and position arrays for easier access
  const allSkills = skillCategories.flatMap((category) => category.skills)
  const allPositions = positionCategories.flatMap((category) => category.positions)

  const [skills, setSkills] = useState(allSkills)
  const [positions, setPositions] = useState(allPositions)
  const [pathNodes, setPathNodes] = useState([
    { id: "node-1", type: "position", itemId: "junior-dev", x: 250, y: 280 },
    { id: "node-2", type: "position", itemId: "senior-dev", x: 600, y: 180 },
    { id: "node-3", type: "skill", itemId: "nodejs", x: 250, y: 360 },
  ])

  const svgRef = useRef(null)
  const [svgDimensions, setSvgDimensions] = useState({ width: 800, height: 500 })
  const [isDragging, setIsDragging] = useState(false)
  const [draggedNode, setDraggedNode] = useState(null)
  const [activeTab, setActiveTab] = useState("skills")
  const [showHelp, setShowHelp] = useState(false)
  const [newSkillName, setNewSkillName] = useState("")
  const [newPositionName, setNewPositionName] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Add new skill
  const addSkill = () => {
    if (!newSkillName.trim()) return

    const newSkill = {
      id: `skill-${Date.now()}`,
      name: newSkillName,
      color: "bg-indigo-100 text-indigo-700",
      icon: <BookOpen />,
    }

    setSkills([...skills, newSkill])
    setNewSkillName("")
  }

  // Add new position
  const addPosition = () => {
    if (!newPositionName.trim()) return

    const newPosition = {
      id: `position-${Date.now()}`,
      name: newPositionName,
      color: "bg-indigo-600",
      icon: <Briefcase />,
    }

    setPositions([...positions, newPosition])
    setNewPositionName("")
  }

  // Generate the curved path
  const generatePath = () => {
    // Sort nodes by x position to ensure path flows left to right
    const sortedNodes = [...pathNodes].filter((node) => node.type === "position").sort((a, b) => a.x - b.x)

    if (sortedNodes.length < 2) return ""

    // Create a smooth curve through position nodes
    let path = `M ${sortedNodes[0].x} ${sortedNodes[0].y}`

    for (let i = 0; i < sortedNodes.length - 1; i++) {
      const current = sortedNodes[i]
      const next = sortedNodes[i + 1]
      const midX = (current.x + next.x) / 2

      // Create a curved path with control points
      path += ` C ${midX} ${current.y}, ${midX} ${next.y}, ${next.x} ${next.y}`
    }

    return path
  }

  // Handle node dragging
  const handleMouseDown = (e, node) => {
    setIsDragging(true)
    setDraggedNode(node)
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !draggedNode) return

    const svg = svgRef.current
    const pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse())

    setPathNodes((prev) => prev.map((n) => (n.id === draggedNode.id ? { ...n, x: svgP.x, y: svgP.y } : n)))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setDraggedNode(null)
  }

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        const { width, height } = svgRef.current.getBoundingClientRect()
        setSvgDimensions({ width, height })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Add a new node to the path
  const addNodeToPath = (item, type) => {
    const newNode = {
      id: `node-${Date.now()}`,
      type,
      itemId: item.id,
      x: svgDimensions.width / 2,
      y: svgDimensions.height / 2,
    }
    setPathNodes([...pathNodes, newNode])
  }

  // Remove a node from the path
  const removeNode = (nodeId) => {
    setPathNodes(pathNodes.filter((node) => node.id !== nodeId))
  }

  // Generate connection lines between skills and positions
  const generateConnections = () => {
    const connections = []

    // Find skill nodes and connect them to the nearest position
    pathNodes
      .filter((node) => node.type === "skill")
      .forEach((skillNode) => {
        // Find the closest position node
        const positionNodes = pathNodes.filter((node) => node.type === "position")
        if (positionNodes.length === 0) return

        let closestNode = positionNodes[0]
        let minDistance = Number.POSITIVE_INFINITY

        positionNodes.forEach((posNode) => {
          const distance = Math.sqrt(Math.pow(posNode.x - skillNode.x, 2) + Math.pow(posNode.y - skillNode.y, 2))
          if (distance < minDistance) {
            minDistance = distance
            closestNode = posNode
          }
        })

        connections.push(
          <line
            key={`conn-${skillNode.id}-${closestNode.id}`}
            x1={skillNode.x}
            y1={skillNode.y}
            x2={closestNode.x}
            y2={closestNode.y}
            stroke="#CBD5E1"
            strokeWidth="2"
            strokeDasharray="5,5"
          />,
        )
      })

    return connections
  }

  // Save career path
  const savePath = () => {
    // Implementation would save to backend
    alert("Lộ trình nghề nghiệp đã được lưu thành công!")
  }

  // Export career path as image
  const exportPath = () => {
    // Implementation would export as image
    alert("Tính năng xuất lộ trình đang được phát triển!")
  }

  // Filter skills and positions based on selected category
  const filteredSkills =
    selectedCategory === "all" ? skills : skills.filter((skill) => skill.category === selectedCategory)

  const filteredPositions =
    selectedCategory === "all" ? positions : positions.filter((position) => position.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent mb-4">
            Xây Dựng Lộ Trình Nghề Nghiệp
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tạo và tùy chỉnh lộ trình phát triển nghề nghiệp của bạn bằng cách kéo thả các vị trí và kỹ năng vào sơ đồ.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Toolbox Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-indigo-100">
              <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <h2 className="text-xl font-bold flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Công Cụ Lộ Trình
                </h2>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="px-4 pt-4">
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="skills" className="text-sm">
                      Kỹ Năng
                    </TabsTrigger>
                    <TabsTrigger value="positions" className="text-sm">
                      Vị Trí
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="skills" className="p-4 space-y-4">
                  {/* Category filters */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <button
                      className={`px-3 py-1 text-xs rounded-full ${
                        selectedCategory === "all"
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => setSelectedCategory("all")}
                    >
                      Tất cả
                    </button>
                    {skillCategories.map((category) => (
                      <button
                        key={category.name}
                        className={`px-3 py-1 text-xs rounded-full flex items-center ${
                          selectedCategory === category.name
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        onClick={() => setSelectedCategory(category.name)}
                      >
                        {category.icon}
                        <span className="ml-1">{category.name}</span>
                      </button>
                    ))}
                  </div>

                  {/* Skills list */}
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {skillCategories.map((category) => (
                      <div key={category.name} className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-700 flex items-center">
                          {category.icon}
                          <span className="ml-2">{category.name}</span>
                        </h3>
                        <div className="grid grid-cols-1 gap-2">
                          {category.skills.map((skill) => (
                            <motion.div
                              key={skill.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`${skill.color} p-3 rounded-xl cursor-pointer flex items-center justify-between group`}
                              onClick={() => addNodeToPath(skill, "skill")}
                            >
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-lg bg-white/50 flex items-center justify-center mr-3">
                                  {skill.icon}
                                </div>
                                <span className="font-medium">{skill.name}</span>
                              </div>
                              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add new skill */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex space-x-2">
                      <Input
                        type="text"
                        placeholder="Thêm kỹ năng mới..."
                        value={newSkillName}
                        onChange={(e) => setNewSkillName(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        onClick={addSkill}
                        disabled={!newSkillName.trim()}
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="positions" className="p-4 space-y-4">
                  {/* Positions list */}
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {positionCategories.map((category) => (
                      <div key={category.name} className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-700 flex items-center">
                          {category.icon}
                          <span className="ml-2">{category.name}</span>
                        </h3>
                        <div className="grid grid-cols-1 gap-2">
                          {category.positions.map((position) => (
                            <motion.div
                              key={position.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`${position.color} text-white p-3 rounded-xl cursor-pointer flex items-center justify-between group`}
                              onClick={() => addNodeToPath(position, "position")}
                            >
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center mr-3">
                                  {position.icon}
                                </div>
                                <span className="font-medium">{position.name}</span>
                              </div>
                              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add new position */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex space-x-2">
                      <Input
                        type="text"
                        placeholder="Thêm vị trí mới..."
                        value={newPositionName}
                        onChange={(e) => setNewPositionName(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        onClick={addPosition}
                        disabled={!newPositionName.trim()}
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Actions Panel */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-4 border border-indigo-100">
              <h3 className="font-medium text-gray-900 mb-3">Thao Tác</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={savePath}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Lưu
                </Button>
                <Button
                  onClick={exportPath}
                  className="bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Xuất
                </Button>
                <Button
                  onClick={() => setShowHelp(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Trợ Giúp
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center">
                  <Share2 className="w-4 h-4 mr-2" />
                  Chia Sẻ
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Lộ Trình Phát Triển Nghề Nghiệp</h2>
                <div className="text-sm text-gray-500">Kéo các nút để điều chỉnh vị trí</div>
              </div>

              {/* SVG Canvas for Path Visualization */}
              <div className="relative bg-indigo-50/50 rounded-xl overflow-hidden border border-indigo-100">
                <svg
                  ref={svgRef}
                  className="w-full h-[500px]"
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  {/* Background Grid */}
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(107, 114, 128, 0.1)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />

                  {/* Career Path Line */}
                  <path
                    d={generatePath()}
                    fill="none"
                    stroke="url(#pathGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />

                  {/* Gradient for path */}
                  <defs>
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#A855F7" />
                    </linearGradient>
                  </defs>

                  {/* Connection Lines */}
                  {generateConnections()}

                  {/* Nodes */}
                  {pathNodes.map((node) => {
                    const item =
                      node.type === "skill"
                        ? skills.find((s) => s.id === node.itemId) || allSkills.find((s) => s.id === node.itemId)
                        : positions.find((p) => p.id === node.itemId) || allPositions.find((p) => p.id === node.itemId)

                    if (!item) return null

                    return (
                      <g
                        key={node.id}
                        transform={`translate(${node.x}, ${node.y})`}
                        onMouseDown={(e) => handleMouseDown(e, node)}
                        style={{ cursor: isDragging && draggedNode?.id === node.id ? "grabbing" : "grab" }}
                      >
                        {node.type === "position" ? (
                          <>
                            {/* Position Node */}
                            <rect
                              x="-90"
                              y="-20"
                              width="180"
                              height="40"
                              rx="8"
                              className={item.color}
                              fill="currentColor"
                            />
                            <circle cx="0" cy="0" r="4" fill="white" />
                            <text
                              x="0"
                              y="5"
                              textAnchor="middle"
                              fill="white"
                              fontSize="14"
                              fontWeight="bold"
                              dominantBaseline="middle"
                            >
                              {item.name}
                            </text>
                            {/* Delete button */}
                            <g
                              transform="translate(75, -15)"
                              onClick={(e) => {
                                e.stopPropagation()
                                removeNode(node.id)
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              <circle r="10" fill="white" fillOpacity="0.3" />
                              <Trash2 className="w-4 h-4 text-white" style={{ transform: "translate(-8px, -8px)" }} />
                            </g>
                          </>
                        ) : (
                          <>
                            {/* Skill Node */}
                            <rect
                              x="-70"
                              y="-20"
                              width="140"
                              height="40"
                              rx="8"
                              className={item.color.split(" ")[0]}
                              fill="currentColor"
                            />
                            <text
                              x="0"
                              y="5"
                              textAnchor="middle"
                              className={item.color.split(" ")[1]}
                              fill="currentColor"
                              fontSize="14"
                              fontWeight="medium"
                              dominantBaseline="middle"
                            >
                              {item.name}
                            </text>
                            {/* Delete button */}
                            <g
                              transform="translate(55, -15)"
                              onClick={(e) => {
                                e.stopPropagation()
                                removeNode(node.id)
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              <circle r="10" fill="white" fillOpacity="0.3" />
                              <Trash2
                                className={`w-4 h-4 ${item.color.split(" ")[1]}`}
                                style={{ transform: "translate(-8px, -8px)" }}
                              />
                            </g>
                          </>
                        )}
                      </g>
                    )
                  })}
                </svg>
              </div>

              <div className="mt-4 text-sm text-gray-600 flex items-center">
                <HelpCircle className="w-4 h-4 mr-2 text-indigo-600" />
                <span>
                  Kéo các nút để điều chỉnh lộ trình. Nhấp vào kỹ năng hoặc vị trí từ hộp công cụ để thêm vào lộ trình
                  của bạn.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Hướng Dẫn Sử Dụng</h3>
              <button onClick={() => setShowHelp(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-indigo-100 p-2 rounded-full mr-3">
                  <ChevronRight className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Thêm Nút</h4>
                  <p className="text-gray-600 text-sm">
                    Nhấp vào kỹ năng hoặc vị trí từ hộp công cụ bên trái để thêm vào lộ trình.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-indigo-100 p-2 rounded-full mr-3">
                  <div className="w-5 h-5 flex items-center justify-center text-indigo-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 15L12 19L16 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 19V5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Di Chuyển Nút</h4>
                  <p className="text-gray-600 text-sm">
                    Nhấp và kéo nút để di chuyển chúng trên lộ trình. Đường dẫn sẽ tự động điều chỉnh.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-indigo-100 p-2 rounded-full mr-3">
                  <Trash2 className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Xóa Nút</h4>
                  <p className="text-gray-600 text-sm">
                    Nhấp vào biểu tượng thùng rác trên mỗi nút để xóa nó khỏi lộ trình.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-indigo-100 p-2 rounded-full mr-3">
                  <Save className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Lưu Lộ Trình</h4>
                  <p className="text-gray-600 text-sm">
                    Nhấp vào nút Lưu để lưu lộ trình của bạn. Bạn có thể truy cập lại sau này.
                  </p>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setShowHelp(false)}
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Đã Hiểu
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CareerPathBuilder

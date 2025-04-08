import ChatbotButton from "@/components/ui/ChatbotButton";
import { useEffect, useRef, useState } from "react";
const CareerPathBuilder = () => {
  const [skills, setSkills] = useState([
    { id: "javascript", name: "JavaScript", color: "bg-purple-100 text-purple-700" },
    { id: "react", name: "React", color: "bg-purple-100 text-purple-700" },
    { id: "python", name: "Python", color: "bg-purple-100 text-purple-700" },
    { id: "aws", name: "AWS", color: "bg-purple-100 text-purple-700" },
    { id: "nodejs", name: "Node.js", color: "bg-purple-100 text-purple-700" },
  ])

  const [positions, setPositions] = useState([
    { id: "junior-dev", name: "Junior Dev", color: "bg-indigo-600" },
    { id: "tech-lead", name: "Tech Lead", color: "bg-indigo-600" },
    { id: "engineering-manager", name: "Engineering Manager", color: "bg-indigo-600" },
    { id: "senior-dev", name: "Senior Dev", color: "bg-indigo-600" },
  ])

  const [pathNodes, setPathNodes] = useState([
    { id: "node-1", type: "position", itemId: "junior-dev", x: 250, y: 280 },
    { id: "node-2", type: "position", itemId: "senior-dev", x: 600, y: 180 },
    { id: "node-3", type: "skill", itemId: "nodejs", x: 250, y: 360 },
  ])

  const svgRef = useRef(null)
  const [svgDimensions, setSvgDimensions] = useState({ width: 800, height: 400 })
  const [isDragging, setIsDragging] = useState(false)
  const [draggedNode, setDraggedNode] = useState(null)

  const addSkill = (newSkill) => {
    setSkills((prevSkills) => [...prevSkills, newSkill]);
  };

  const addPosition = (newPosition) => {
    setPositions((prevPositions) => [...prevPositions, newPosition]);
  };

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

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-full">
        {/* Toolbox Sidebar */}
        <div className="w-64 border-r p-4 bg-card">
          <h2 className="text-xl font-bold mb-6">Hộp công cụ</h2>

          {/* Skills Section */}
          <div className="mb-8">
            <h3 className="font-medium mb-3">Kĩ năng</h3>
            <div className="space-y-2">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className={`${skill.color} p-2 rounded cursor-pointer`}
                  onClick={() => addNodeToPath(skill, "skill")}
                >
                  {skill.name}
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                addSkill({
                  id: `skill-${Date.now()}`,
                  name: "New Skill",
                  color: "bg-green-100 text-green-700",
                });
                addPosition({
                  id: `position-${Date.now()}`,
                  name: "New Position",
                  color: "bg-green-600",
                });
              }}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
            >
              Add Skill
            </button>
          </div>

          {/* Positions Section */}
          <div>
            <h3 className="font-medium mb-3">Vị trí</h3>
            <div className="space-y-2">
              {positions.map((position) => (
                <div
                  key={position.id}
                  className={`${position.color} text-white p-2 rounded cursor-pointer`}
                  onClick={() => addNodeToPath(position, "position")}
                >
                  {position.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-8">Lộ trình phát triển</h1>

          {/* SVG Canvas for Path Visualization */}
          <svg
            ref={svgRef}
            className="w-full h-[500px] border rounded-lg bg-white"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Career Path Line */}
            <path d={generatePath()} fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" />

            {/* Connection Lines */}
            {generateConnections()}

            {/* Nodes */}
            {pathNodes.map((node) => {
              const item =
                node.type === "skill"
                  ? skills.find((s) => s.id === node.itemId)
                  : positions.find((p) => p.id === node.itemId)

              if (!item) return null

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onMouseDown={(e) => handleMouseDown(e, node)}
                  style={{ cursor: "move" }}
                >
                  {node.type === "position" ? (
                    <>
                      <rect x="-75" y="-15" width="150" height="30" rx="6" className={item.color} fill="currentColor" />
                      <circle cx="0" cy="0" r="4" fill="white" />
                      <text x="0" y="5" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                        {item.name}
                      </text>
                    </>
                  ) : (
                    <>
                      <rect
                        x="-50"
                        y="-15"
                        width="100"
                        height="30"
                        rx="6"
                        className={item.color.split(" ")[0]}
                        fill="currentColor"
                      />
                      <text
                        x="0"
                        y="5"
                        textAnchor="middle"
                        className={item.color.split(" ")[1]}
                        fill="currentColor"
                        fontSize="12"
                      >
                        {item.name}
                      </text>
                    </>
                  )}
                </g>
              )
            })}
          </svg>

          <div className="mt-4 text-sm text-muted-foreground">
            Drag the nodes to adjust your career path. Click on skills or positions from the toolbox to add them to your
            path.
          </div>
        </div>
      </div>
      <ChatbotButton/>
    </div>
  )
}

export default CareerPathBuilder;
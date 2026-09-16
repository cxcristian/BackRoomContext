"use client";

import { useMemo, useCallback } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  Node,
  Edge
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ShieldCheck, Layout, Server, Database, Cloud, BrainCircuit, X } from "lucide-react";
import { ContextNode, nodesData } from "../data/nodesData";

interface CustomNodeData extends Record<string, unknown> {
  isRoot?: boolean;
  title: string;
  icon: string;
  color: string;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "shield-check": return <ShieldCheck size={20} />;
    case "layout": return <Layout size={20} />;
    case "server": return <Server size={20} />;
    case "database": return <Database size={20} />;
    case "cloud": return <Cloud size={20} />;
    case "brain": return <BrainCircuit size={28} />;
    default: return <Database size={20} />;
  }
};

function CustomRoomNode({ data }: { data: CustomNodeData }) {
  const isRoot = data.isRoot;
  
  return (
    <div className={`relative flex items-center justify-center p-4 rounded-xl border border-[#3f3f46] bg-[#171717] cursor-pointer transition-all duration-300 group hover:scale-105`}
         style={{
           boxShadow: `0 0 20px ${data.color}20`,
           borderColor: data.color
         }}>
      <Handle type="target" position={Position.Top} className="opacity-0" />
      
      <div className="flex flex-col items-center gap-2">
        <div className={`p-2 rounded-lg`} style={{ color: data.color, backgroundColor: `${data.color}20` }}>
          {getIcon(data.icon)}
        </div>
        <span className="text-sm font-medium text-gray-200 text-center whitespace-nowrap">
          {data.title}
        </span>
      </div>

      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  );
}

const nodeTypes = {
  room: CustomRoomNode,
};

interface MapContextProps {
  onNodeClick: (nodeId: string) => void;
}

export function MapContext({ onNodeClick }: MapContextProps) {
  
  const { initialNodes, initialEdges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Root Node
    nodes.push({
      id: "root",
      type: "room",
      position: { x: 0, y: 0 },
      data: {
        title: "Arquitectura Backroom",
        icon: "brain",
        color: "#8B5CF6",
        isRoot: true
      },
    });

    const radius = 350;
    const totalNodes = nodesData.length;

    nodesData.forEach((node, index) => {
      // Calculate position in a circle around the root
      const angle = (index * (Math.PI * 2)) / totalNodes - Math.PI / 2; // Start from top
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      nodes.push({
        id: node.id,
        type: "room",
        position: { x, y },
        data: {
          title: node.title,
          icon: node.icon,
          color: node.color
        },
      });

      edges.push({
        id: `root-${node.id}`,
        source: "root",
        target: node.id,
        type: "straight",
        animated: true,
        style: { stroke: node.color, strokeWidth: 2, opacity: 0.6 },
      });
    });

    return { initialNodes: nodes, initialEdges: edges };
  }, []);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClickCallback = useCallback((event: React.MouseEvent, node: Node) => {
    if (node.id !== "root") {
      onNodeClick(node.id);
    }
  }, [onNodeClick]);

  return (
    <div className="w-full h-full bg-[#111] overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClickCallback}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.5}
        maxZoom={2}
        className="bg-[#111]"
      >
        <Background color="#3f3f46" gap={16} size={1} />
        <Controls 
          className="bg-[#27272a] border-[#3f3f46] fill-[#ccc3d8]"
          showInteractive={false}
        />
      </ReactFlow>
    </div>
  );
}

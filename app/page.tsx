"use client";

import { useState } from "react";
import { MapContext } from "../components/MapContext";
import { SidebarDetail } from "../components/SidebarDetail";
import { nodesData, ContextNode } from "../data/nodesData";

export default function Home() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const selectedNode = selectedNodeId 
    ? nodesData.find(n => n.id === selectedNodeId) || null 
    : null;

  return (
    <main className="w-screen h-screen bg-[#111] overflow-hidden flex relative selection:bg-[#7C3AED] selection:text-white">
      {/* Background Grid Map */}
      <div className="flex-1 w-full h-full">
        <MapContext onNodeClick={(id) => setSelectedNodeId(id)} />
      </div>

      {/* Floating Header */}
      <div className="absolute top-6 left-6 pointer-events-none z-40">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Backroom <span className="text-[#8B5CF6]">Context</span>
        </h1>
        <p className="text-gray-400 mt-1">
          Mapa arquitectónico interactivo de los requerimientos y decisiones técnicas.
        </p>
      </div>

      {/* Detail Sidebar */}
      <SidebarDetail 
        node={selectedNode} 
        onClose={() => setSelectedNodeId(null)} 
      />
    </main>
  );
}

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
        <p className="text-gray-400 mt-1 mb-3">
          Mapa arquitectÃ³nico interactivo de los requerimientos y decisiones tÃ©cnicas.
        </p>
        <a href="https://notebook.google.com/notebook/fe218eec-3873-4b9f-bef0-b561c31f7fec" target="_blank" rel="noopener noreferrer" className="pointer-events-auto inline-flex items-center gap-2 px-3 py-1.5 bg-[#7C3AED]/10 text-[#8B5CF6] border border-[#7C3AED]/30 rounded-lg text-sm font-medium hover:bg-[#7C3AED]/20 transition-colors shadow-lg backdrop-blur-md"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg> Escuchar Podcast de BackRoom</a>
      </div>

      {/* Detail Sidebar */}
      <SidebarDetail 
        node={selectedNode} 
        onClose={() => setSelectedNodeId(null)} 
      />
    </main>
  );
}


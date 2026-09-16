"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ContextNode } from "../data/nodesData";

interface SidebarDetailProps {
  node: ContextNode | null;
  onClose: () => void;
}

export function SidebarDetail({ node, onClose }: SidebarDetailProps) {
  return (
    <AnimatePresence>
      {node && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 w-full md:w-[600px] h-full bg-[#171717] border-l border-[#3f3f46] shadow-2xl z-50 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div 
            className="px-6 py-5 border-b border-[#3f3f46] flex items-center justify-between"
            style={{ borderBottomColor: `${node.color}40` }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${node.color}20`, color: node.color }}>
                {/* We just show a colored dot since lucide icons are in the map, or we can use the dot */}
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: node.color }} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{node.title}</h2>
                <p className="text-sm text-gray-400">{node.description}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#27272a] text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {node.content}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

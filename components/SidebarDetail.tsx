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
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[800px] h-[85vh] bg-[#171717] border border-[#3f3f46] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div 
              className="px-6 py-5 border-b border-[#3f3f46] flex items-center justify-between"
              style={{ borderBottomColor: `${node.color}40` }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${node.color}20`, color: node.color }}>
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
        </>
      )}
    </AnimatePresence>
  );
}

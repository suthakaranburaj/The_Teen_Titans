import React from 'react'
import { motion } from "framer-motion";

function AuthBox() {
  return (
    <motion.div 
      className="hidden lg:block relative h-screen overflow-hidden w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700"
        style={{
          background: `
            linear-gradient(
              135deg, 
              rgba(59, 130, 246, 0.9) 0%, 
              rgba(37, 99, 235, 0.9) 100%
            )
          `,
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.1)'
        }}
      />
    </motion.div>
  )
}

export default AuthBox
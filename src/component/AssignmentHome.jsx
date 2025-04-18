import { motion } from "motion/react"
import React from 'react'
import '../UI/assignment-home.css'
import { Link } from 'react-router-dom';
export default function AssignmentHome() {
    return (
        <div className="assignment-home-container">
            <div className="grid">
                <a href="http://worlddevelopment.in/sbm_home" target="_blank" rel="noopener noreferrer" className="card-link">
                    <div className="card"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                    >
                        <img src="/assignmentCardImage/SBM.png" alt="" />
                        <h3 className="card-title">SBM Digital</h3>
                    </div>
                </a>
                <a href="http://worlddevelopment.in/kanban" target="_blank" rel="noopener noreferrer" className="card-link">
                    <div className="card"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                    >
                        <img src="/assignmentCardImage/kan-ban.png" alt="" />
                        <h3 className="card-title">Kan-Ban View</h3>
                    </div>
                </a>
                <Link to="/chatadmin" rel="noopener noreferrer" className="card-link">
                    <div className="card"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                    >
                        <img src="/assignmentCardImage/chatadmin.png" alt="" />
                        <h3 className="card-title">Support Chat Automation</h3>
                    </div>
                </Link>
                <Link to="http://your-link-here.com" target="_blank" rel="noopener noreferrer" className="card-link">
                    <div className="card"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                    >
                        <img src="/assignmentCardImage/card.png" alt="" />
                        <h3 className="card-title">Assignment Card</h3>
                    </div>
                </Link>
            </div>
        </div>
    )
}
// This is a simple functional component that renders a heading and a paragraph.
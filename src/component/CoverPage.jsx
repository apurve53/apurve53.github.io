import React, { useEffect } from 'react';
import { motion } from "framer-motion";
import { FaComments, FaServer, FaLock, FaChartBar, FaMobileAlt, FaTools, FaBuilding, FaGamepad, FaCloudUploadAlt, FaDesktop, FaProjectDiagram } from "react-icons/fa";

const ProjectContribution = () => {
    const appTypes = [
        { icon: <FaComments />, title: "Real-Time Applications", desc: "Chat apps, Chatbots, live support systems, real-time dashboards.", tech: "Socket.IO, WebSocket, WebRTC, React.js" },
        { icon: <FaServer />, title: "REST APIs / Backends", desc: "APIs for mobile/web apps and microservices.", tech: "Express.js, MongoDB, MySQL, JWT" },
        { icon: <FaLock />, title: "Authentication Systems", desc: "Email/phone login, sessions, and multi-auth.", tech: "Passport.js, express-sesstion" },
        { icon: <FaChartBar />, title: "Analytics Dashboards", desc: "User tracking, reporting, data visualization.", tech: "Chart.js, MongoDB Aggregation, Reactjs or HTML, Vanila JS" },
        { icon: <FaMobileAlt />, title: "Mobile App Backends", desc: "Backends for React Native, Flutter apps.", tech: "Express, MongoDB Atlas" },
        { icon: <FaTools />, title: "Custom Tools & Scripts", desc: "Cron jobs, file processors, automations.", tech: "node-cron, puppeteer, shell scripting" },
        { icon: <FaBuilding />, title: "Enterprise Internal Tools", desc: "CRMs, resource managers, admin tools.", tech: "NestJS, GraphQL, Mongodb" },
        { icon: <FaGamepad />, title: "Multiplayer Games", desc: "Browser-based real-time games.", tech: "Socket.IO, Three.js, Canvas API, WebRTC" },
        { icon: <FaCloudUploadAlt />, title: "Deployment & DevOps", desc: "Deploying applications to the cloud or VPS with CI/CD.", tech: "PM2, Nginx, GitHub Actions, AWS, Netlify" },
        { icon: <FaDesktop />, title: "In-House Server Management", desc: "Handling servers on Linux and Windows environments.", tech: "Apache, Nginx, SSH, Windows Services, Linux CLI, cron jobs, SSL/TLS (HTTPS), security enhancements" }
    ];
    useEffect(() => {
        var x = 10;
        // getDimentions();
    }, [])
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const getDimentions = async function () {
        // let response = await fetch("http://worlddevelopment.in/getdimention", {
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     method: "POST",
        //     body: JSON.stringify({ widthe: screenWidth, height: screenHeight }),
        //     credentials: 'include'
        // })
        // if (response.ok) {
        //     const data = await response.json();
        // }
    }

    let flag = true;
    const checkElementPosition = (id) => {
        const elem = document.getElementById(id);
        const elemY = elem.getBoundingClientRect().y; // Get the element's Y position
        const screenHeight = window.innerHeight; // Height of the viewport

        // Check if the element is in the viewport
        if (elemY > 10 && elemY < screenHeight - 10) {
            if (flag) {
                console.log('Element entered viewport: Adding animation class');
                elem.classList.add('anim');
                flag = false; // Prevent multiple triggers
            }
        } else {
            if (!flag) {
                console.log('Element exited viewport: Removing animation class');
                elem.classList.remove('anim');
                flag = true; // Allow re-triggering when the element re-enters
            }
        }
    };
    document.body.onscroll = function (evt) {
        checkElementPosition('howcani');
        checkElementPosition('whatIBuild');
    }

    return (
        <>
            <div className='containerStyle'>
                <div className='textStyle'>
                    I am writing to express my interest in your web development project. My name is{' '}
                    <strong>Apurve Srivastava</strong>, and I have over <strong>4 years of experience</strong> in
                    building and delivering fully functional websites from the ground up. My expertise includes{' '}
                    <strong>Node.js, React.js, HTML5, CSS, and JavaScript</strong>, and I specialize in completing
                    projects independently to ensure precision and quality at every stage. I pride myself on taking
                    full ownership of projects, from planning and development to deployment. I am confident that I
                    can handle your project personally and deliver it as per your expectations. If the scope demands
                    additional resources, I have a reliable and skilled team that I can collaborate with to meet
                    deadlines without compromising quality.
                </div>
                <div className='imageContainerStyle'>
                    <img className='adi' src='/images/webdeveloper.png'></img>
                </div>
                <div className='contribution'>
                    <p id='howcani' className='titleStyle'>Here’s how I can contribute to your project</p>
                    <ul className='listStyle'>
                        <li>
                            <motion.span whileHover={{ scale: [null, 1.01, 1.05], transition: { duration: 0.5, times: [0, 0.6, 1], ease: ["easeInOut", "easeOut"], } }} transition={{ duration: 0.3, ease: "easeOut", }}>
                                <h3>
                                    End-to-End Development
                                </h3>
                                <p>
                                    I ensure all phases – <i>design, coding, testing, and deployment</i> are executed seamlessly.
                                </p>
                            </motion.span>
                            <img className='leftForwordAnimation1' src='/images/endtoend.png'></img>
                        </li>
                        <li>
                            <motion.span whileHover={{ scale: [null, 1.01, 1.05], transition: { duration: 0.5, times: [0, 0.6, 1], ease: ["easeInOut", "easeOut"], } }} transition={{ duration: 0.3, ease: "easeOut", }}>
                                <h3>
                                    Custom Solutions
                                </h3>
                                <p>
                                    <i>Tailoring the application</i> to your unique requirements using
                                    modern tools and best practices.
                                </p>
                            </motion.span>
                            <img className='leftForwordAnimation1' src='/images/custsol.png'></img>
                        </li>
                        <li>
                            <motion.span whileHover={{ scale: [null, 1.01, 1.05], transition: { duration: 0.5, times: [0, 0.6, 1], ease: ["easeInOut", "easeOut"], } }} transition={{ duration: 0.3, ease: "easeOut", }}>
                                <h3>
                                    Deployment Expertise
                                </h3>
                                <p>
                                    Managing the complete <i>deployment process</i>, including <i>hosting, server configuration, and DNS setup.</i>
                                </p>
                            </motion.span>
                            <img className='leftForwordAnimation1' src='/images/deploym.png'></img>
                        </li>
                    </ul>
                    <div className='textStyle2'>
                        I approach every project with a commitment to excellence, ensuring the solution aligns perfectly with the client’s vision. My independent working style and ability to manage multiple responsibilities make me a dependable choice for delivering quality work within agreed timelines.
                        I would welcome the opportunity to discuss your project in more detail and demonstrate how I can bring it to life. Thank you for considering my application, and I look forward to collaborating with you.
                    </div>

                </div>
                <div className="tech_box">
                    <h1 id="whatIBuild" className="whatIBuld">
                        <span><FaProjectDiagram /></span><span className="">What I Build With <span className="">Node.js</span></span>
                    </h1>
                    <div className="tech_tile_box">
                        {appTypes.map((app, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div>{app.icon}</div>
                                <h2>{app.title}</h2>
                                <p>{app.desc}</p>
                                <p>Tech: {app.tech}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div className="project-tile-wrapper mt-8">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1 * 0.1 }}
                        viewport={{ once: true }}
                        className='project-tile'>
                        <h2 className="text-3xl font-bold mb-6 text-[#3f2b27]">🚀 Project 1: Transforming Music Distribution with a Powerful Admin Platform</h2>
                        <p className="mb-4 text-[#3f2b27]">
                            When a music distributor approached me, he had one goal:
                            <br />
                            <em>"Make managing my users, payments, and music data seamless and secure."</em>
                        </p>
                        <p className="mb-4 text-[#3f2b27]">
                            I stepped in to design and build a complete Music Distribution Platform tailored to his needs. Here's what I delivered:
                        </p>
                        <ul className="list-disc list-inside space-y-1 mb-4 text-[#3f2b27]">
                            <li>✅ A full-featured Admin Panel that acts as the control center of his business.</li>
                            <li>📊 Automated Excel file processing, saving hours of manual work.</li>
                            <li>💳 Payment management system that tracks and organizes client transactions efficiently.</li>
                            <li>🔐 A secure email-password authentication system to protect sensitive data.</li>
                            <li>👥 A user-specific interface that allows every client to access only what they need.</li>
                        </ul>
                        <p className="mb-8 mt-8 text-[#3f2b27]">
                            <strong>Result:</strong> This system gave him the ability to scale operations effortlessly, focus more on partnerships, and spend less time buried in backend chaos. The platform has since become a central pillar of his business growth.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 3 * 0.1 }}
                        viewport={{ once: true }}
                        className='project-tile'>
                        <h2 className="text-3xl font-bold mb-6 text-[#3f2b27]">🤖 Project 2: Real-Time Chatbot Admin Panel – Point, Click, Automate</h2>
                        <p className="mb-4 text-[#3f2b27]">
                            In the world of fast-paced digital interaction, businesses can't afford delays in customer support.
                            <br />
                            That’s why I created a Real-Time Chatbot Admin Panel — a game-changer for managing automated customer conversations.
                        </p>
                        <p className="mb-4 text-[#3f2b27]">Here’s what makes it powerful:</p>
                        <ul className="list-disc list-inside mb-4 text-[#3f2b27]">
                            <li>🧠 A visual admin panel where you can configure chatbots in just a few clicks — no tech skills required.</li>
                            <li>📡 Socket.io-powered real-time communication ensures instant message delivery and feedback.</li>
                            <li>🧾 Comprehensive documentation to guide users through setup and customization with ease.</li>
                            <li>🏢 Built to help businesses handle frequent client questions without hiring a large support team.</li>
                        </ul>
                        <p className="mb-8 mt-8 text-[#3f2b27]">
                            <strong>Impact:</strong> This project enabled businesses to stay responsive 24/7, reduce support workload, and improve customer satisfaction dramatically. The ease of use and real-time interaction gave clients a significant edge over competitors.
                        </p>
                    </motion.div>
                    <div className="final-thoughts">

                        <h2 className="text-2xl font-semibold text-[#3f2b27] mb-4">💡 Final Thoughts</h2>
                        <p>
                            Both of these solutions were built with a vision:
                            <br />
                            To simplify operations, boost productivity, and empower businesses with tools that are both powerful and easy to use.
                            <br />
                            <strong>I don’t just build projects — I build solutions that solve real problems and fuel growth.</strong>
                        </p>
                    </div>
                </div>
            </div >
            <footer className='footer-cover-page footer-login-page'>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contacts</a></li>
                </ul>
                <p>&copy; All rights reserved.</p>
            </footer>
        </>
    );
};

export default ProjectContribution;

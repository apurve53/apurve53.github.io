import React, { useEffect } from 'react'
import { projects } from '../data/projectData'

export default function ProjectContainer() {
  useEffect(() => {
    const scrollableContainer = document.querySelector('.scrollable-container');

    const showScrollbar = () => {
      scrollableContainer.classList.add('show-scrollbar');
      setTimeout(() => {
        scrollableContainer.classList.remove('show-scrollbar');
      }, 3000);
    };

    scrollableContainer.addEventListener('mousemove', showScrollbar);
    scrollableContainer.addEventListener('scroll', showScrollbar);

    return () => {
      scrollableContainer.removeEventListener('mousemove', showScrollbar);
      scrollableContainer.removeEventListener('scroll', showScrollbar);
    };
  }, []);

  const listOfProjectElements = projects.map((project) => {
    return <div key={project.id} className="project-should-card">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </div>
  })
  return (
    <div className='scrollable-container'>
      {listOfProjectElements}
    </div>
  )
}

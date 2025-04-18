import React from 'react'
import { useNavigate } from 'react-router-dom';
export default function Unautherized() {
  const navigate = useNavigate();

  return (
    <div className='unau_container'>
      <div className="heading_jambo">Page Not Found</div>
      <div className="para_big">Your Login is not succecfull</div>
      <div className="gb_btn" onClick={() => {
        navigate('/');
      }}>GO BACK TO HOME PAGE</div>
    </div>)
}
import React, { useState } from 'react';
import '../UI/GetQuery.css';
const GetQuery = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        // Dynamic fields will be added here
    });

    const handleOptionChange = (event) => {
        const newOption = event.target.value;
        setSelectedOption(newOption);
        // Reset dynamic fields when the option changes
        setFormData((prevData) => ({
            email: prevData.email,
            phone: prevData.phone,
            [newOption]: '', // Initialize the new dynamic field
        }));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form Data:', formData);
        fetch('https://worlddevelopment.in/add_to_google_sheet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(formData),
            credentials: 'include'
        })
            .then((response) => {
                if (response.ok) {
                    alert('Form submitted successfully!');
                } else {
                    alert('Error submitting form.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Error submitting form.');
            });

    };

    const renderDynamicFields = () => {
        switch (selectedOption) {
            case 'You need My Developer':
                return (
                    <div className="mb-4">
                        <label htmlFor="developerType" className="block text-gray-700 text-sm font-bold mb-2">
                            Type of Developer:
                        </label>
                        <input
                            type="text"
                            id="developerType"
                            name="developerType"
                            value={formData.developerType || ''}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                );
            case 'New Project':
                return (
                    <div className="mb-4">
                        <label htmlFor="projectName" className="block text-gray-700 text-sm font-bold mb-2">
                            Project Name:
                        </label>
                        <input
                            type="text"
                            id="projectName"
                            name="projectName"
                            value={formData.projectName || ''}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <label htmlFor="projectDescription" className="block text-gray-700 text-sm font-bold mb-2">
                            Brief Description:
                        </label>
                        <textarea
                            id="projectDescription"
                            name="projectDescription"
                            value={formData.projectDescription || ''}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                );
            case 'Project Contribution':
                return (
                    <div className="mb-4">
                        <label htmlFor="projectToContribute" className="block text-gray-700 text-sm font-bold mb-2">
                            Project Name:
                        </label>
                        <input
                            type="text"
                            id="projectToContribute"
                            name="projectToContribute"
                            value={formData.projectToContribute || ''}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <label htmlFor="contributionDetails" className="block text-gray-700 text-sm font-bold mb-2">
                            How can you contribute?
                        </label>
                        <textarea
                            id="contributionDetails"
                            name="contributionDetails"
                            value={formData.contributionDetails || ''}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                );
            case 'Full Time Work':
                return (
                    <div className="mb-4">
                        <label htmlFor="desiredRole" className="block text-gray-700 text-sm font-bold mb-2">
                            Desired Role:
                        </label>
                        <input
                            type="text"
                            id="desiredRole"
                            name="desiredRole"
                            value={formData.desiredRole || ''}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <label htmlFor="experience" className="block text-gray-700 text-sm font-bold mb-2">
                            Years of Experience:
                        </label>
                        <input
                            type="number"
                            id="experience"
                            name="experience"
                            value={formData.experience || ''}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <form id='getQueery' onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
                <label htmlFor="options" className="form-label">
                    Select an Option:
                </label>
                <select
                    id="options"
                    value={selectedOption}
                    onChange={handleOptionChange}
                    className="form-select"
                >
                    <option value="">-- Select --</option>
                    <option value="You need My Developer">You need My Developer</option>
                    <option value="New Project">New Project</option>
                    <option value="Project Contribution">Project Contribution</option>
                    <option value="Full Time Work">Full Time Work</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="email" className="form-label">
                    Email:
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label htmlFor="phone" className="form-label">
                    Phone:
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                />
            </div>
            {/* This is where dynamic fields will appear */}
            {renderDynamicFields()}
            <button
                type="submit"
                disabled={!selectedOption}
                className="form-button"
            >
                Submit
            </button>
        </form>
    );
};

export default GetQuery;

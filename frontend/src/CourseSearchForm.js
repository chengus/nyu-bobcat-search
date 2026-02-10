// frontend/src/CourseSearchForm.js
import React, { useState } from 'react';

function CourseSearchForm({ onSearch }) {
    const [filters, setFilters] = useState({
        code: '',
        title: '',
        crn: '',
        schd: '',
        campus_group: ''
    });

    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(filters);
    };

    return (
        <form onSubmit={handleSubmit} className="course-search-form">
            <div className="form-field">
                <label htmlFor="code">Course Code</label>
                <input
                    id="code"
                    type="text"
                    name="code"
                    placeholder="e.g. MATH-UA"
                    value={filters.code}
                    onChange={handleChange}
                />
            </div>
            <div className="form-field">
                <label htmlFor="title">Course Title</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    placeholder="e.g. Calculus"
                    value={filters.title}
                    onChange={handleChange}
                />
            </div>
            <div className="form-field">
                <label htmlFor="crn">CRN</label>
                <input
                    id="crn"
                    type="text"
                    name="crn"
                    placeholder="e.g. 12345"
                    value={filters.crn}
                    onChange={handleChange}
                />
            </div>
            <div className="form-field">
                <label htmlFor="schd">Class Type</label>
                <input
                    id="schd"
                    type="text"
                    name="schd"
                    placeholder="e.g. LEC, RCT"
                    value={filters.schd}
                    onChange={handleChange}
                />
            </div>
            <div className="form-field">
                <label htmlFor="campus_group">Campus</label>
                <select id="campus_group" name="campus_group" value={filters.campus_group} onChange={handleChange}>
                    <option value="">All Campuses</option>
                    <option value="WSQ">Washington Square</option>
                    <option value="BROOKLYN">Brooklyn</option>
                </select>
            </div>
            <div className="form-field form-actions">
                <button type="submit">Search</button>
            </div>
        </form>
    );
}

export default CourseSearchForm;

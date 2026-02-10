// frontend/src/CourseList.js
import React from 'react';

function CourseList({ courses, onStageCourse, onSelectCourse, selectedCourse }) {
    if (!courses || courses.length === 0) {
        return <p className="empty-state">No courses found. Try adjusting your search criteria.</p>;
    }

    return (
        <div className="course-list">
            <p className="results-count">Found {courses.length} course{courses.length !== 1 ? 's' : ''}</p>
            {courses.map(course => (
                <div 
                    key={course.section_id} 
                    className={`course-item ${selectedCourse?.section_id === course.section_id ? 'selected' : ''}`}
                    onClick={() => onSelectCourse(course)}
                >
                    <div className="course-item-header">
                        <h3>{course.course_code}</h3>
                        <span className="course-section">{course.no}</span>
                    </div>
                    <div className="course-item-title">{course.title}</div>
                    <div className="course-item-meta">
                        <span>{course.schd} {course.meets || 'TBA'}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CourseList;

import React from 'react';

interface Course {
  id: number;
  title: string;
  description: string;
  durationMinutes: number;
}

interface SubscribedCoursesProps {
  subscribedCourses: Course[];
}

const SubscribedCourses: React.FC<SubscribedCoursesProps> = ({ subscribedCourses }) => {
  return (
    <div>
      <h2>Subscribed Courses</h2>
      <ul>
        {subscribedCourses.map((course) => (
          <li key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>Duration: {course.durationMinutes} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscribedCourses;

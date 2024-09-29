import React from 'react';

export interface Course {
  id: number;
  title: string;
  description: string;
  durationMinutes: number;
}

export interface CourseListProps {
  allCourses: Course[];
  subscribedCourses: Course[];
  onSubscribe: (courseId: number) => void;
}

const CourseList: React.FC<CourseListProps> = ({ allCourses, subscribedCourses, onSubscribe }) => {
  const isSubscribed = (courseId: number) => {
    return subscribedCourses.some((course) => course.id === courseId);
  };

  return (
    <div>
      <h2>Available Courses</h2>
      <ul>
        {allCourses.map((course) => (
          <li key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>Duration: {course.durationMinutes} minutes</p>
            {!isSubscribed(course.id) ? (
              <button onClick={() => onSubscribe(course.id)}>Subscribe</button>
            ) : (
              <span>Already Subscribed</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;

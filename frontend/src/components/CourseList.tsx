import { FC, useEffect, useState } from 'react';

interface Course {
  id: number;
  title: string;
  description: string;
  durationMinutes: number;
}

const CourseList: FC<{ onSubscribe: (courseId: number) => void }> = ({ onSubscribe }) => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/courses')
      .then((response) => response.json())
      .then((data) => setCourses(data));
  }, []);

  return (
    <div>
      <h2>Available Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>Duration: {course.durationMinutes} minutes</p>
            <button onClick={() => onSubscribe(course.id)}>Subscribe</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;

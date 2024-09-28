import { FC, useEffect, useState } from 'react';

interface Course {
  id: number;
  title: string;
  description: string;
  durationMinutes: number;
}

const SubscribedCourses: FC<{ learnerId: number }> = ({ learnerId }) => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (learnerId) {
      fetch(`http://localhost:3001/subscriptions/${learnerId}`)
        .then((response) => response.json())
        .then((data) => setCourses(data));
    }
  }, [learnerId]);

  return (
    <div>
      <h2>Subscribed Courses</h2>
      <ul>
        {courses.map((course) => (
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

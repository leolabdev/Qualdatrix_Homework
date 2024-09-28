import { FC, useState } from 'react';
import CourseList from '../components/CourseList';
import SubscribedCourses from '../components/SubscribedCourses';

const CoursePage: FC = () => {
  const [learnerId, setLearnerId] = useState<number | null>(null);

  const handleSubscribe = (courseId: number) => {
    if (learnerId) {
      fetch('http://localhost:3001/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ learnerId, courseId }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Subscription created:', data);
        });
    } else {
      alert('Please enter a valid learner ID');
    }
  };

  return (
    <div>
      <h1>Course Subscription</h1>
      <div>
        <label htmlFor="learnerId">Enter your learner ID: </label>
        <input
          type="number"
          id="learnerId"
          onChange={(e) => setLearnerId(parseInt(e.target.value, 10))}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <div style={{ width: '45%' }}>
          <CourseList onSubscribe={handleSubscribe} />
        </div>
        <div style={{ width: '45%' }}>
          {learnerId && <SubscribedCourses learnerId={learnerId} />}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;

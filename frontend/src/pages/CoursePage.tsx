import { useState } from 'react';
import CourseList from '../components/CourseList';
import SubscribedCourses from '../components/SubscribedCourses';
import { useCourses } from '../hooks/useCourses';
import { useSubscribedCourses } from '../hooks/useSubscribedCourses';
import { useSubscribe } from '../hooks/useSubscribe';

function CoursePage() {
  const [learnerId, setLearnerId] = useState<number | null>(null);
  const { allCourses, isLoading: isLoadingCourses, error: coursesError } = useCourses();
  const {
    subscribedCourses,
    isLoading: isLoadingSubscriptions,
    error: subscriptionsError,
    refetchSubscribedCourses,
  } = useSubscribedCourses(learnerId);
  const { handleSubscribe, isLoading: isLoadingSubscribe, error: subscribeError } = useSubscribe(learnerId, refetchSubscribedCourses);

  return (
    <div>
      <h1>Course Subscription</h1>
      {coursesError && <p style={{ color: 'red' }}>{coursesError}</p>}
      {subscriptionsError && <p style={{ color: 'red' }}>{subscriptionsError}</p>}
      {subscribeError && <p style={{ color: 'red' }}>{subscribeError}</p>}

      <div>
        <label htmlFor="learnerId">Enter your learner ID: </label>
        <input
          type="number"
          id="learnerId"
          onChange={(e) => setLearnerId(parseInt(e.target.value, 10))}
        />
      </div>

      {(isLoadingCourses || isLoadingSubscriptions || isLoadingSubscribe) ? (
        <p>Loading...</p>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <div style={{ width: '45%' }}>
            <CourseList
              allCourses={allCourses}
              subscribedCourses={subscribedCourses}
              onSubscribe={handleSubscribe}
            />
          </div>
          <div style={{ width: '45%' }}>
            {learnerId && <SubscribedCourses subscribedCourses={subscribedCourses} />}
          </div>
        </div>
      )}
    </div>
  );
}

export default CoursePage;

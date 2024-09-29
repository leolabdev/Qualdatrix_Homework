import { useState } from 'react';
import CourseList from '../components/CourseList';
import SubscribedCourses from '../components/SubscribedCourses';
import { useCourses } from '../hooks/useCourses';
import { useSubscribedCourses } from '../hooks/useSubscribedCourses';
import { useSubscribe } from '../hooks/useSubscribe';
import { useUnsubscribe } from '../hooks/useUnsubscribe';

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
  const { handleUnsubscribe, isLoading: isLoadingUnsubscribe, error: unsubscribeError } = useUnsubscribe(learnerId, refetchSubscribedCourses);

  return (
    <div>
      <h1>Course Subscription</h1>

      {coursesError && <p style={{ color: 'red' }}>{coursesError}</p>}
      {subscriptionsError && <p style={{ color: 'red' }}>{subscriptionsError}</p>}
      {subscribeError && <p style={{ color: 'red' }}>{subscribeError}</p>}
      {unsubscribeError && <p style={{ color: 'red' }}>{unsubscribeError}</p>}

      <div>
        <label htmlFor="learnerId">Enter your learner ID: </label>
        <input
          type="number"
          id="learnerId"
          value={learnerId || ''}
          onChange={(e) => setLearnerId(e.target.value ? parseInt(e.target.value, 10) : null)}
        />
      </div>

      {(isLoadingCourses || isLoadingSubscriptions || isLoadingSubscribe || isLoadingUnsubscribe) ? (
        <p>Loading...</p>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <div style={{ width: '45%' }}>
            <h2>Available Courses</h2>
            <CourseList
              allCourses={allCourses}
              subscribedCourses={subscribedCourses}
              onSubscribe={handleSubscribe}
            />
          </div>
          <div style={{ width: '45%' }}>
            <h2>Subscribed Courses</h2>
            {learnerId ? (
              <SubscribedCourses
                subscribedCourses={subscribedCourses}
                onUnsubscribe={handleUnsubscribe}
              />
            ) : (
              <p>Please enter your learner ID to view subscribed courses.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CoursePage;


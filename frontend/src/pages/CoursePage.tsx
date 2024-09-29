import { useState } from 'react';
import CourseList from '../components/CourseList';
import SubscribedCourses from '../components/SubscribedCourses';
import { useCourses } from '../hooks/useCourses';
import { useSubscribedCourses } from '../hooks/useSubscribedCourses';
import { useSubscribe } from '../hooks/useSubscribe';
import { useUnsubscribe } from '../hooks/useUnsubscribe';
import { useDragAndDropSubscription } from '../hooks/useDragAndDropSubscription';
import AddCourseForm from '../components/AddCourseForm.tsx';
import { useAddCourse } from '../hooks/useAddCourse.ts';
import { useDeleteCourse } from '../hooks/useDeleteCourse.ts';

function CoursePage() {
  const [learnerId, setLearnerId] = useState<number | null>(null);
  const { allCourses, isLoading: isLoadingCourses, error: coursesError, refetchCourses } = useCourses();
  const {
    subscribedCourses,
    // isLoading: isLoadingSubscriptions,
    error: subscriptionsError,
    refetchSubscribedCourses,
  } = useSubscribedCourses(learnerId);
  const { handleSubscribe,
    // isLoading: isLoadingSubscribe,
    error: subscribeError
  } = useSubscribe(learnerId, refetchSubscribedCourses);
  const { handleUnsubscribe,
    // isLoading: isLoadingUnsubscribe,
    error: unsubscribeError
  } = useUnsubscribe(learnerId, refetchSubscribedCourses);

  const {
    handleDragStart,
    handleDropToSubscribe,
    handleDropToUnsubscribe,
    handleDragOver,
  } = useDragAndDropSubscription(learnerId, refetchSubscribedCourses);

  const { handleAddCourse } = useAddCourse(refetchCourses);
  const { handleDeleteCourse } = useDeleteCourse(refetchCourses);


  return (
    <div>
      <h1>Course Subscription</h1>

      <AddCourseForm onAddCourse={handleAddCourse} />

      <div style={{
        marginTop: "30px"
      }}></div>

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

      {(isLoadingCourses) ? (
        <p>Loading...</p>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <div
            style={{ width: '45%', backgroundColor: '#f0f0f0', padding: '10px' }}
            onDragOver={handleDragOver}
            onDrop={handleDropToUnsubscribe}
          >
            <h2>Available Courses</h2>
            <CourseList
              allCourses={allCourses}
              subscribedCourses={subscribedCourses}
              onSubscribe={handleSubscribe}
              onDragStart={handleDragStart}
              onDeleteCourse={handleDeleteCourse}
            />
          </div>

          <div
            style={{ width: '45%', backgroundColor: '#e0e0e0', padding: '10px' }}
            onDragOver={handleDragOver}
            onDrop={handleDropToSubscribe}
          >
            <h2>Subscribed Courses</h2>
            {learnerId ? (
              <SubscribedCourses
                subscribedCourses={subscribedCourses}
                onUnsubscribe={handleUnsubscribe}
                onDragStart={handleDragStart}
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

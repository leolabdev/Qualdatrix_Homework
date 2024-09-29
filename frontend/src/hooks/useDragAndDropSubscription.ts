import { useState } from 'react';
import { useSubscribe } from './useSubscribe';
import { useUnsubscribe } from './useUnsubscribe';
import { DragEvent } from 'react';

export function useDragAndDropSubscription(learnerId: number | null, refetchSubscribedCourses: () => void) {
  const [draggedCourse, setDraggedCourse] = useState<Course | null>(null);
  const { handleSubscribe } = useSubscribe(learnerId, refetchSubscribedCourses);
  const { handleUnsubscribe } = useUnsubscribe(learnerId, refetchSubscribedCourses);

  const handleDragStart = (_e: DragEvent<HTMLDivElement>, course: Course) => {
    setDraggedCourse(course);
  };


  const handleDropToSubscribe = () => {
    if (!learnerId) {
      alert('Please enter a valid learner ID');
      return;
    }

    if (draggedCourse && learnerId) {
      handleSubscribe(draggedCourse.id);
      setDraggedCourse(null);
    }
  };


  const handleDropToUnsubscribe = () => {
    if (draggedCourse && learnerId) {
      handleUnsubscribe(draggedCourse.id);
      setDraggedCourse(null);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return {
    handleDragStart,
    handleDropToSubscribe,
    handleDropToUnsubscribe,
    handleDragOver,
  };
}

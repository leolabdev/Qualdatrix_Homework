import { useState } from 'react';
import { apiService } from '../ApiService';

export function useUnsubscribe(learnerId: number | null, refetchSubscribedCourses: () => void) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleUnsubscribe = (courseId: number) => {
    if (!learnerId) {
      setError('No learner ID provided');
      return;
    }

    setIsLoading(true);
    setError(null);
    apiService
      .unsubscribeFromCourse(learnerId, courseId)
      .then(() => {
        refetchSubscribedCourses();
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to unsubscribe from course');
      })
      .finally(() => setIsLoading(false));
  };

  return { handleUnsubscribe, isLoading, error };
}

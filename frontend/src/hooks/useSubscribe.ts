import { useState } from 'react';
import { apiService } from '../ApiService.ts';

export function useSubscribe(learnerId: number | null, refetchSubscribedCourses: () => void) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = (courseId: number) => {
    if (learnerId) {
      setIsLoading(true);
      apiService.subscribeToCourse(learnerId, courseId)
        .then(() => {
          refetchSubscribedCourses();
        })
        .catch((err) => {
          console.error(err);
          setError('Failed to subscribe to course');
        })
        .finally(() => setIsLoading(false));
    } else {
      alert('Please enter a valid learner ID');
    }
  };

  return { handleSubscribe, isLoading, error };
}

import { useState, useEffect } from 'react';
import { Course } from '../components/CourseList';
import { apiService } from '../ApiService.ts';

export function useSubscribedCourses(learnerId: number | null) {
  const [subscribedCourses, setSubscribedCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refetchSubscribedCourses = () => {
    if (learnerId) {
      setIsLoading(true);
      apiService.fetchSubscribedCourses(learnerId)
        .then(setSubscribedCourses)
        .catch((err) => {
          console.error(err);
          setError('Failed to fetch subscribed courses');
        })
        .finally(() => setIsLoading(false));
    }
  };

  useEffect(() => {
    refetchSubscribedCourses();
  }, [learnerId]);

  return { subscribedCourses, isLoading, error, refetchSubscribedCourses };
}

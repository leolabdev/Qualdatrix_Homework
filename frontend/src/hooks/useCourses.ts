import { useState, useEffect } from 'react';
import { apiService } from '../ApiService';

export function useCourses() {
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = () => {
    setIsLoading(true);
    setError(null);
    apiService.fetchAllCourses()
      .then(setAllCourses)
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch courses');
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return { allCourses, isLoading, error, refetchCourses: fetchCourses };
}

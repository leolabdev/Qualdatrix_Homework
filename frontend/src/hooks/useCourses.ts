import { useState, useEffect } from 'react';
import { apiService } from '../ApiService.ts';
import { Course } from '../components/CourseList';

export function useCourses() {
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    apiService.fetchAllCourses()
      .then(setAllCourses)
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch courses');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { allCourses, isLoading, error };
}

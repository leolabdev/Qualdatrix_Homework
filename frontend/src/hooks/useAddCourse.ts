import { apiService } from '../api/ApiService.ts';

export function useAddCourse(refetchCourses: () => void) {
  const handleAddCourse = async (course: Omit<Course, 'id'>) => {
    try {
      await apiService.addCourse(course);
      refetchCourses();
    } catch (err) {
      console.error('Failed to add course:', err);
    }
  };

  return { handleAddCourse };
}

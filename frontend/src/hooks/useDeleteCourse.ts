import { apiService } from '../ApiService';

export function useDeleteCourse(refetchCourses: () => void) {
  const handleDeleteCourse = async (courseId: number) => {
    try {
      await apiService.deleteCourse(courseId);
      refetchCourses();
    } catch (err) {
      console.error('Failed to delete course:', err);
    }
  };

  return { handleDeleteCourse };
}

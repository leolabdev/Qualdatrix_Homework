const API_URL = import.meta.env.VITE_API_URL;

class ApiService {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Fetch all available courses
  async fetchAllCourses(): Promise<Course[]> {
    const response = await fetch(`${this.baseUrl}/courses`);
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    return response.json();
  }

  // Fetch subscribed courses for a learner
  async fetchSubscribedCourses(learnerId: number): Promise<Course[]> {
    const response = await fetch(`${this.baseUrl}/subscriptions/${learnerId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch subscribed courses');
    }
    return response.json();
  }

  // Subscribe a learner to a course
  async subscribeToCourse(learnerId: number, courseId: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ learnerId, courseId }),
    });

    if (!response.ok) {
      throw new Error('Failed to subscribe to course');
    }
  }

  async unsubscribeFromCourse(learnerId: number, courseId: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/subscriptions`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ learnerId, courseId }),
    });

    if (!response.ok) {
      throw new Error('Failed to unsubscribe from course');
    }
  }

  // Add a new course
  async addCourse(course: Omit<Course, 'id'>): Promise<Course> {
    const response = await fetch(`${this.baseUrl}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(course),
    });

    if (!response.ok) {
      throw new Error('Failed to add course');
    }

    return response.json();
  }

  // Delete a course
  async deleteCourse(courseId: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/courses/${courseId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete course');
    }
  }


}

export const apiService = new ApiService(API_URL);

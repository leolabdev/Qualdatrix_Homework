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
}

export const apiService = new ApiService(API_URL);

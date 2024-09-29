declare global {
  interface Course {
    id: number;
    title: string;
    description: string;
    durationMinutes: number;
  }
}

export {};
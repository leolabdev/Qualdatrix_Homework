interface SubscribedCoursesProps {
  subscribedCourses: Course[];
  onUnsubscribe: (courseId: number) => void;
}

const SubscribedCourses = (props: SubscribedCoursesProps) => {
  const { subscribedCourses, onUnsubscribe } = props;

  return (
    <div>
      {subscribedCourses.map((course) => (
        <div key={course.id}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <p>Duration: {course.durationMinutes} minutes</p>
          <button onClick={() => onUnsubscribe(course.id)}>Unsubscribe</button>
        </div>
      ))}
    </div>
  );
};

export default SubscribedCourses;

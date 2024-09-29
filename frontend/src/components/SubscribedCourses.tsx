interface SubscribedCoursesProps {
  subscribedCourses: Course[];
}

const SubscribedCourses = (props : SubscribedCoursesProps) => {
  const { subscribedCourses } = props;

  return (
    <div>
        {subscribedCourses.map((course) => (
          <div key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>Duration: {course.durationMinutes} minutes</p>
          </div>
        ))}
    </div>
  );
};

export default SubscribedCourses;

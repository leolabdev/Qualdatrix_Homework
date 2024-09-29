import CourseCard from './CourseCard.tsx';

interface SubscribedCoursesProps {
  subscribedCourses: Course[];
  onUnsubscribe: (courseId: number) => void;
}

const SubscribedCourses = (props: SubscribedCoursesProps) => {
  const { subscribedCourses, onUnsubscribe } = props;

  return (
    <div>
      {subscribedCourses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          buttonProps={{
            text: 'Unsubscribe',
            onClick: () => onUnsubscribe(course.id),
            style: {
              backgroundColor: '#FF6347',
              color: 'white',
            },
          }}
        />
      ))}
    </div>
  );
};

export default SubscribedCourses;

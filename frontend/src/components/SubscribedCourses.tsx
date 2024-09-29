import CourseCard from './CourseCard.tsx';

interface SubscribedCoursesProps {
  subscribedCourses: Course[];
  onUnsubscribe: (courseId: number) => void;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, course: Course) => void;
}

const SubscribedCourses = (props: SubscribedCoursesProps) => {
  const { subscribedCourses, onUnsubscribe, onDragStart } = props;

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
          dragProps={{
            draggable: true,
            onDragStart: onDragStart ? (e) => onDragStart(e, course) : undefined,
          }}
        />
      ))}
    </div>
  );
};

export default SubscribedCourses;

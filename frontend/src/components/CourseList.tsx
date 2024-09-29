import CourseCard from './CourseCard.tsx';

interface CourseListProps {
  allCourses: Course[];
  subscribedCourses: Course[];
  onSubscribe: (courseId: number) => void;
}

const CourseList  = (props: CourseListProps) => {

  const {
    subscribedCourses,
    onSubscribe,
    allCourses
  } = props;


  const isSubscribed = (courseId: number) => {
    return subscribedCourses.some((course) => course.id === courseId);
  };

  return (
    <div>
      {allCourses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          buttonProps={{
            text: isSubscribed(course.id) ? 'Already Subscribed' : 'Subscribe',
            onClick: () => {
              if (!isSubscribed(course.id)) {
                onSubscribe(course.id);
              }
            },
            style: {
              backgroundColor: isSubscribed(course.id) ? '#d3d3d3' : '#4CAF50',
              color: 'white',
            },
            disabled: isSubscribed(course.id)
          }}
        />
      ))}
    </div>
  );

};

export default CourseList;

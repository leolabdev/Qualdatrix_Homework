import CourseCard from './CourseCard.tsx';
import { DragEvent } from 'react';

interface CourseListProps {
  allCourses: Course[];
  subscribedCourses: Course[];
  onSubscribe: (courseId: number) => void;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, course: Course) => void;
  onDeleteCourse: (courseId: number) => void;
}

const CourseList = (props: CourseListProps) => {
  const {
    subscribedCourses,
    onSubscribe,
    allCourses,
    onDragStart,
    onDeleteCourse
  } = props;

  const isSubscribed = (courseId: number) => {
    return subscribedCourses.some((course) => course.id === courseId);
  };

  return (
    <div>
      {allCourses.map((course) => (
        <div
          key={course.id}
          style={{
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
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
              disabled: isSubscribed(course.id),
            }}
            dragProps={{
              draggable: true,
              onDragStart: onDragStart ? (e: DragEvent<HTMLDivElement>) => onDragStart(e, course) : undefined,
            }}
          />
          <button style={{
            color: "red"
          }} onClick={() => onDeleteCourse(course.id)}>
            Delete Course
          </button>
        </div>
      ))}
    </div>
  );

};

export default CourseList;


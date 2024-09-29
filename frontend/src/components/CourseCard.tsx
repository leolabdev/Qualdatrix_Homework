import { CSSProperties, DragEvent } from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
  style?: CSSProperties;
  disabled?: boolean;
}

interface DragProps {
  draggable?: boolean;
  onDragStart?: (e: DragEvent<HTMLDivElement>, course: Course) => void;
}

interface CourseCardProps {
  course: Course;
  buttonProps: ButtonProps;
  dragProps?: DragProps;
}

const CourseCard = (props: CourseCardProps) => {

  const {
    course,
    buttonProps,
    dragProps
  } = props;

  return (
    <div
      style={{
        border: '1px solid #ddd',
        padding: '15px',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
        marginBottom: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
      draggable={dragProps?.draggable}
      onDragStart={(e) => dragProps?.onDragStart && dragProps.onDragStart(e, course)}
    >
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <p>Duration: {course.durationMinutes} minutes</p>
      <button
        onClick={buttonProps.onClick}
        disabled={buttonProps.disabled}
        style={{
          ...buttonProps.style,
          padding: '10px',
          border: 'none',
          borderRadius: '5px',
          cursor: buttonProps.disabled ? 'not-allowed' : 'pointer',
        }}
      >
        {buttonProps.text}
      </button>
    </div>
  );
};

export default CourseCard;

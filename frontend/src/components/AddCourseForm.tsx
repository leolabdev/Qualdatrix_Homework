import { CSSProperties, useState } from 'react';

interface AddCourseFormProps {
  onAddCourse: (course: Omit<Course, 'id'>) => void;
}

const AddCourseForm = (props: AddCourseFormProps) => {
  const { onAddCourse } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [durationMinutes, setDurationMinutes] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description && durationMinutes) {
      onAddCourse({ title, description, durationMinutes });
      setTitle('');
      setDescription('');
      setDurationMinutes(null);
    }
  };

  const formStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '20px auto',
  };

  const labelStyle = {
    marginBottom: '5px',
    fontWeight: 'bold',
  };

  const inputStyle = {
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    width: '100%',
    fontSize: '16px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h3>Add New Course</h3>
      <div>
        <label style={labelStyle}>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={inputStyle}
        />
      </div>
      <div>
        <label style={labelStyle}>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={inputStyle}
        />
      </div>
      <div>
        <label style={labelStyle}>Duration (minutes)</label>
        <input
          type="number"
          value={durationMinutes || ''}
          onChange={(e) => setDurationMinutes(parseInt(e.target.value, 10))}
          required
          style={inputStyle}
        />
      </div>
      <button type="submit" style={buttonStyle}>Add Course</button>
    </form>
  );
};

export default AddCourseForm;

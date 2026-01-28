import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";
import { fetchStudents } from "./studentReducer";
import { useEffect } from "react";

const StudentView = () => {
  const { students, status, error } = useSelector((state) => state.students);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  return (
    <main className="container py-3">
      <h1>Student View </h1>
      <NavLink className="btn btn-primary" to="addStudent">
        Add Student
      </NavLink>

      <ul className="py-4">
        {status === "loading" ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : students.length === 0 ? (
          <p>No students found</p>
        ) : (
          status &&
          students.length > 0 &&
          students.map((student) => (
            <li key={student.id}>
              <NavLink to={`${student.id}`}>
                {student.name} (Age: {student.age})
              </NavLink>
            </li>
          ))
        )}
      </ul>
    </main>
  );
};

export default StudentView;

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";
import { fetchAllTeachers } from "./schoolReducer";
import { useEffect } from "react";

const TeachersList = () => {
  const teachers = useSelector((state) => state.school.teachers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTeachers());
  }, []);

  return (
    <main className="container py-4">
      <h1>Teachers List </h1>
      {teachers && teachers.length > 0 ? (
        <ul>
          {teachers.map((teacher) => (
            <NavLink to={`${teacher.id}`}>
              {" "}
              <li key={teacher.name}>{teacher.name}</li>
            </NavLink>
          ))}
        </ul>
      ) : (
        <p>No teachers found.</p>
      )}
    </main>
  );
};

export default TeachersList;

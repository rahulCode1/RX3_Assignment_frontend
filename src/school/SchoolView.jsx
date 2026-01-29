import { useDispatch, useSelector } from "react-redux";
import { updateSchoolStats } from "./schoolReducer";
import { useEffect } from "react";
import { NavLink } from "react-router";
import { fetchStudents } from "../students/studentReducer";

const SchoolView = () => {
  const dispatch = useDispatch();
  const { students, status, error } = useSelector((state) => state.students);
  const school = useSelector((state) => state.school.school);
  const totalNumberOfStudents = students.length;
  const avgAttendance =
    students.length === 0
      ? ""
      : students.reduce((acc, curr) => acc + Number(curr.attendance), 0) /
        totalNumberOfStudents;

  const avgMarks =
    students.length === 0
      ? ""
      : students.reduce((acc, curr) => acc + Number(curr.marks), 0) /
        totalNumberOfStudents;

  const topperStudent =
    students.length === 0
      ? ""
      : students.reduce((acc, curr) => {
          if (Number(curr.marks) > Number(acc.marks)) {
            acc = curr;
          }

          return acc;
        }, students[0]);

  useEffect(() => {
    dispatch(
      updateSchoolStats({
        totalNumberOfStudents,
        avgAttendance,
        avgMarks,
        topperStudent: topperStudent && topperStudent.name,
      }),
    );
  }, [dispatch, totalNumberOfStudents, avgAttendance, avgMarks, topperStudent]);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <main className="container py-4">
      <h1>School View </h1>

      {status === "Loading" ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h5>Total Students: {school && school.totalNumberOfStudents}</h5>
          <h5>
            Average Attendance:
            {school && school.avgAttendance
              ? school.avgAttendance.toFixed(2)
              : "No students found."}
          </h5>
          <h5>
            Average Marks:
            {school && school.avgMarks
              ? school.avgMarks.toFixed(2)
              : "No students found."}
          </h5>
          <h5>
            Topper Student:
            {school && school.topperStudent
              ? school.topperStudent
              : "No student found."}
          </h5>
        </div>
      )}

      <NavLink to="teachers/addTeacher" className="btn btn-primary my-4">
        Add Teacher
      </NavLink>
    </main>
  );
};

export default SchoolView;

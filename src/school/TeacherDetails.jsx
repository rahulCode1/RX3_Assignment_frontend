import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router";
import { deleteTeacher } from "./schoolReducer";

const TeacherDetails = () => {
  const teacherId = useParams().id;
  const teachers = useSelector((state) => state.school.teachers);
  const teacherInfo = teachers.find((teacher) => teacher.id === teacherId);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTeacher(teacherId));
    navigate("/school/teachers");
  };

  if (!teacherInfo) {
    return (
      <>
        <p>No teacher information found.</p>{" "}
      </>
    );
  }

  return (
    <main className="container py-4">
      <h1>Teacher Details </h1>
      <h2>{teacherInfo.name}</h2>
      <h4>Subject: {teacherInfo.subject}</h4>
      <NavLink
        to="/school/teachers/addTeacher"
        state={{ ...teacherInfo }}
        className="btn btn-secondary"
      >
        Edit Teacher{" "}
      </NavLink>
      <button onClick={handleDelete} className="btn btn-danger mx-2">
        Delete{" "}
      </button>
    </main>
  );
};

export default TeacherDetails;

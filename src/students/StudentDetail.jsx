import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { deleteStudentAsync } from "./studentReducer";

const StudentDetail = () => {
  const studentId = useParams().id;
  const students = useSelector((state) => state.students.students);
  const studentInfo = students.find((student) => student.id === studentId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!studentInfo) {
    return (
      <main className="container py-4">
        <h2>Student not found</h2>
      </main>
    );
  }

  const handleDelete = async (id) => {
    await dispatch(deleteStudentAsync(id));
    navigate(`/`);
  };

  return (
    <>
      <main className="container py-4">
        <h1>Student Details </h1>
        <div className="py-3">
          <h2> {studentInfo.name}</h2>
          <h4>Age: {studentInfo.age}</h4>
          <h4>Grade: {studentInfo.grade}</h4>
          <h4>Gender: {studentInfo.gender}</h4>
        </div>
        <NavLink
          state={{ ...studentInfo }}
          to="/addStudent"
          className="btn btn-secondary"
        >
          Edit Details
        </NavLink>
        <button
          onClick={() => handleDelete(studentInfo.id)}
          className="btn btn-danger mx-3"
        >
          Delete{" "}
        </button>
      </main>
    </>
  );
};

export default StudentDetail;

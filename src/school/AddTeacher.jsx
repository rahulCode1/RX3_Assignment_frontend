import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { addTeachers, updateTeacher } from "./schoolReducer";

const AddTeacher = () => {
  const dispatch = useDispatch();
  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "Hindi",
    "History",
    "Geography",
    "Political Science",
    "Economics",
    "Computer Science",
  ];

  const teacherInfo = useLocation().state;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // console.log(data)

    if (teacherInfo) {
    await  dispatch(updateTeacher({ ...data, id: teacherInfo.id }));
      navigate(`/school/teachers/${teacherInfo.id}`);
    } else {
     await dispatch(addTeachers(data));
    }
  };

  return (
    <main className="container py-4">
      <h1>Add Teacher </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          defaultValue={teacherInfo && teacherInfo.name}
          id="name"
          name="name"
          placeholder="Name"
          required
        />
        <br />
        <br />
        <div>
          <select
            id="subject"
            name="subject"
            className=""
            required
            defaultValue={teacherInfo && teacherInfo.subject}
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary my-3">
          {teacherInfo ? "Update " : " Add Teacher"}
        </button>
      </form>
    </main>
  );
};

export default AddTeacher;

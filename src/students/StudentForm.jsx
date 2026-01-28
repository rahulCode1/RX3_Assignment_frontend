import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { addStudentAsync, updateStudentAsync } from "./studentReducer";

const StudentForm = () => {
  const initialState = {
    name: "",
    age: "",
    grade: "",
    gender: "",
    attendance: "",
    marks: "",
  };

  const [formData, setFormData] = useState(initialState);

  const studentInfo = useLocation().state;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (studentInfo) {
      setFormData(studentInfo);
    }
  }, [studentInfo]);

  const handleOnChange = (e) => {
    setFormData((prevStat) => {
      return { ...prevStat, [e.target.id]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (studentInfo) {
      if (
        formData.name.length === 0 ||
        Number(formData.age) < 0 ||
        formData.grade < 0 ||
        formData.gender.length === 0 ||
        Number(formData.attendance) < 0 ||
        Number(formData.marks) < 0
      ) {
        return alert("Please provide correct form input values.");
      }
      await dispatch(
        updateStudentAsync({
          id: formData.id,
          name: formData.name,
          age: Number(formData.age),
          grade: formData.grade,
          gender: formData.gender,
          marks: Number(formData.marks),
          attendance: Number(formData.attendance),
        }),
      );
      navigate(`/students/${studentInfo.id}`);
    } else {
      if (
        formData.name.length === 0 ||
        Number(formData.age) < 0 ||
        formData.grade.length === 0
      ) {
        return alert("Please provide correct form input values.");
      }

      await dispatch(
        addStudentAsync({
          name: formData.name,
          age: Number(formData.age),
          grade: formData.grade,
          gender: formData.gender,
          marks: "",
          attendance: "",
        }),
      );
      setFormData(initialState);
      navigate(`/students`);
    }
  };

  console.log(formData);

  return (
    <main className="container py-4">
      <form className="form">
        <div className="mb-3">
          <input
            type="text"
            placeholder="Name"
            className=""
            id="name"
            onChange={handleOnChange}
            value={formData.name}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            placeholder="Age"
            className=""
            id="age"
            onChange={handleOnChange}
            value={formData.age}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Grade"
            className="form"
            id="grade"
            onChange={handleOnChange}
            value={formData.grade}
          />
        </div>

        <div>
          <div className=" mb-3">
            <label htmlFor="gender">Gender: </label>
            <label htmlFor="gender" className="form-check-label px-2">
              <input
                type="radio"
                className="form-check-input"
                name="gender"
                id="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleOnChange}
              />
              Male
            </label>
            <label htmlFor="gender" className="form-check-label px-2">
              <input
                type="radio"
                className="form-check-input "
                name="gender"
                id="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleOnChange}
              />
              Female
            </label>
          </div>
        </div>

        {studentInfo && (
          <div>
            {" "}
            <div className="mb-3">
              <input
                type="number"
                placeholder="Attendance"
                className="form"
                id="attendance"
                onChange={handleOnChange}
                value={formData.attendance}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                placeholder="Marks"
                className="form"
                id="marks"
                onChange={handleOnChange}
                value={formData.marks}
                required
              />
            </div>
          </div>
        )}

        <button onClick={handleSubmit} className="">
          Add
        </button>
      </form>
    </main>
  );
};

export default StudentForm;

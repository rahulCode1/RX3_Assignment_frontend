import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSortBy } from "./studentReducer";
import { fetchStudents } from "./studentReducer";
import { useEffect } from "react";

const ClassView = () => {
  const { students, error, status } = useSelector((state) => state.students);
  const filter = useSelector((state) => state.students.filter);
  const sortBy = useSelector((state) => state.students.sortBy);

  console.log(students);

  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  let filteredStudents =
    filter === "All"
      ? students
      : students.filter((student) => student.gender === filter);

  let sortedStudents = [...filteredStudents];

  if (sortBy === "Name") {
    sortedStudents.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "Marks") {
    sortedStudents.sort((a, b) => Number(b.marks) - Number(a.marks));
  } else if (sortBy === "Attendance") {
    sortedStudents.sort((a, b) => Number(b.attendance) - Number(a.attendance));
  }

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  return (
    <main className="container py-4">
      <h1>Class View </h1>
      <div className="my-2">
        <label htmlFor="gender">Filter by Gender: </label>
        <select id="gender" onChange={handleFilterChange} className="mx-2">
          <option value={"All"}>All</option>
          <option value={"male"}>Male</option>
          <option value={"female"}>Female</option>
        </select>
      </div>
      <div>
        <label htmlFor="sortByName">Sort by:</label>
        <select id="sortByName" onChange={handleSortChange} className="mx-2">
          <option value={"Name"}>Name</option>
          <option value={"Marks"}>Marks</option>
          <option value={"Attendance"}>Attendance</option>
        </select>
      </div>
      <ul className="py-3">
        {status === "Loading" ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          sortedStudents.map((student) => (
            <li key={student.id}>
              <p>
                {student.name} - {student.gender}
                {student.marks &&
                  student.attendance &&
                  ` - Marks: ${student.marks} - Attendance:
              ${student.attendance}`}
              </p>
            </li>
          ))
        )}
      </ul>
    </main>
  );
};

export default ClassView;

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./layout/RootLayout";
import StudentForm from "./students/StudentForm.jsx";
import StudentView from "./students/StudentView";
import StudentDetail from "./students/StudentDetail.jsx";
import ClassView from './students/ClassView.jsx'
import SchoolView from "./school/SchoolView.jsx";
import AddTeacher from "./school/AddTeacher.jsx";
import TeachersList from "./school/TeachersList.jsx";
import TeacherDetails from "./school/TeacherDetails.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <StudentForm />,
      },
      {
        path: "students",

        children: [

          {
            index: true,
            element: <StudentView />,
          },
          {
            path: "addStudent",
            element: <StudentForm />,
          },
          {
            path: ":id",
            element: <StudentDetail />
          },
          {
            path: "classes",
            element: <ClassView />
          }
        ]
      },
      {
        path: 'school',
        // element: <SchoolView />,
        children: [
          {
            index: true, element: <SchoolView />
          },
          {
            path: 'teachers', children: [
              {
                index: true, element: <TeachersList />
              },
              {
                path: 'addTeacher', element: <AddTeacher />
              },
              {
                path: ":id", element: <TeacherDetails />
              }
            ]
          },

        ]
      }
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

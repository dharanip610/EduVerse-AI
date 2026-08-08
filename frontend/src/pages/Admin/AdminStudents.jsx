import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudents } from "../../services/adminService";
import "../../styles/adminStudents.css";

export default function AdminStudents() {

  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

async function loadStudents() {

  setLoading(true);

  const { data, error } = await getStudents();

  console.log("DATA =>", data);
  console.log("ERROR =>", error);

  if (!error) {
    setStudents(data || []);
    setFilteredStudents(data || []);
  }

  setLoading(false);

}

  function handleSearch(value) {

    setSearch(value);

    const keyword = value.toLowerCase();

    setFilteredStudents(

      students.filter(student =>
        student.full_name?.toLowerCase().includes(keyword) ||
        student.email?.toLowerCase().includes(keyword)
      )

    );

  }

  return (

    <div className="admin-students-page">

      <div className="students-header">

        <div>

          <h1>👨‍🎓 Students</h1>

          <p>Manage all registered students.</p>

        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/admin-dashboard")}
        >
          ← Dashboard
        </button>

      </div>

      <div className="students-toolbar">
        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e)=>handleSearch(e.target.value)}
        />

      </div>

      <div className="students-table">

        <table>

          <thead>

            <tr>

              <th>Name</th>

              <th>Email</th>

              <th>Class</th>

              <th>Joined</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td colSpan="5">

                  Loading Students...

                </td>

              </tr>

            ) : filteredStudents.length===0 ? (

              <tr>

                <td colSpan="5">

                  No Students Found

                </td>

              </tr>

            ) : (

              filteredStudents.map(student=>(

                <tr key={student.id}>

                  <td>{student.full_name}</td>

                  <td>{student.email}</td>

                 <td>{student.class}</td> 

                  <td>

                    {new Date(student.created_at).toLocaleDateString()}

                  </td>

                  <td>

                    <span className="status active">

                      Active

                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StudentList from "./components/StudentList";
import "./App.css";

function App() {
  const [students, setStudents] = useState([
    {
      name: "Ankita Patra",
      rollNumber: "101",
      department: "Computer Science",
      semester: "5th",
      cgpa: 8.7,
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&h=240&q=80"
    },
    {
      name: "Rahul Sharma",
      rollNumber: "102",
      department: "Information Technology",
      semester: "5th",
      cgpa: 9.1,
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&h=240&q=80"
    },
    {
      name: "Priya Das",
      rollNumber: "103",
      department: "Electronics",
      semester: "4th",
      cgpa: 8.4,
      photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=240&h=240&q=80"
    },
    {
      name: "Amit Roy",
      rollNumber: "104",
      department: "Mechanical Engineering",
      semester: "6th",
      cgpa: 9.3,
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&h=240&q=80"
    }
  ]);
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All departments");
  const [sortBy, setSortBy] = useState("name");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formError, setFormError] = useState("");

  const departments = ["Computer Science", "Information Technology", "Electronics", "Mechanical Engineering"];

  const normalizedQuery = query.trim().toLowerCase();
  const visibleStudents = students
    .filter((student) => {
      const matchesQuery = `${student.name} ${student.rollNumber} ${student.department}`
        .toLowerCase()
        .includes(normalizedQuery);
      return matchesQuery && (department === "All departments" || student.department === department);
    })
    .sort((first, second) => sortBy === "cgpa"
      ? second.cgpa - first.cgpa
      : first.name.localeCompare(second.name));

  const averageCgpa = students.length
    ? (students.reduce((total, student) => total + Number(student.cgpa), 0) / students.length).toFixed(2)
    : "0.00";

  const addStudent = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const student = Object.fromEntries(formData.entries());
    if (students.some((currentStudent) => currentStudent.rollNumber === student.rollNumber.trim())) {
      setFormError("That roll number is already in use.");
      return;
    }
    setFormError("");
    student.rollNumber = student.rollNumber.trim();
    setStudents((currentStudents) => [...currentStudents, { ...student, cgpa: Number(student.cgpa) }]);
    setIsFormOpen(false);
  };

  return (
    <div className="app">
      <Header />

      <main className="dashboard">
        <section className="welcome-row">
          <div>
            <p className="eyebrow">ACADEMIC DIRECTORY</p>
            <h1>Students</h1>
            <p className="welcome-copy">Your campus, all in one place.</p>
          </div>
          <button className="add-button" type="button" onClick={() => { setFormError(""); setIsFormOpen(true); }}>+ Add student</button>
        </section>

        <section className="stats-grid" aria-label="Student overview">
          <article className="stat-card stat-card--green">
            <span className="stat-label">Total students</span>
            <strong>{students.length.toString().padStart(2, "0")}</strong>
            <span className="stat-note">Across all departments</span>
          </article>
          <article className="stat-card stat-card--yellow">
            <span className="stat-label">Average CGPA</span>
            <strong>{averageCgpa}</strong>
            <span className="stat-note">Overall academic average</span>
          </article>
          <article className="stat-card stat-card--blue">
            <span className="stat-label">Departments</span>
            <strong>{new Set(students.map((student) => student.department)).size.toString().padStart(2, "0")}</strong>
            <span className="stat-note">Represented in this directory</span>
          </article>
        </section>

        <section className="roster-section">
          <div className="roster-heading">
            <div>
              <h2>Student directory</h2>
              <p>{visibleStudents.length} {visibleStudents.length === 1 ? "student" : "students"} shown</p>
            </div>
            <div className="roster-controls">
              <label className="search-box">
                <span aria-hidden="true">⌕</span>
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search students" aria-label="Search students" />
              </label>
              <select value={department} onChange={(event) => setDepartment(event.target.value)} aria-label="Filter by department">
                <option>All departments</option>
                {departments.map((name) => <option key={name}>{name}</option>)}
              </select>
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort students">
                <option value="name">Sort: Name</option>
                <option value="cgpa">Sort: CGPA</option>
              </select>
            </div>
          </div>

          {visibleStudents.length ? <StudentList students={visibleStudents} /> : (
            <div className="empty-state"><strong>No students found</strong><span>Try a different name or department.</span></div>
          )}
        </section>
      </main>

      <Footer />

      {isFormOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setIsFormOpen(false);
        }}>
          <section className="student-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="modal-heading">
              <div><p className="eyebrow">NEW RECORD</p><h2 id="modal-title">Add a student</h2></div>
              <button className="close-button" type="button" aria-label="Close" onClick={() => setIsFormOpen(false)}>×</button>
            </div>
            <form className="student-form" onSubmit={addStudent}>
              <label>Full name<input name="name" placeholder="e.g. Maya Sen" required /></label>
              <div className="form-row">
                <label>Roll number<input name="rollNumber" placeholder="e.g. 105" required /></label>
                <label>Semester<input name="semester" placeholder="e.g. 5th" required /></label>
              </div>
              <label>Department<select name="department" defaultValue="Computer Science">{departments.map((name) => <option key={name}>{name}</option>)}</select></label>
              <div className="form-row">
                <label>CGPA<input name="cgpa" type="number" min="0" max="10" step="0.1" placeholder="0.0 - 10.0" required /></label>
                <label>Photo URL <span className="optional-label">(optional)</span><input name="photo" type="url" placeholder="https://..." /></label>
              </div>
              {formError && <p className="form-error" role="alert">{formError}</p>}
              <div className="modal-actions">
                <button className="cancel-button" type="button" onClick={() => setIsFormOpen(false)}>Cancel</button>
                <button className="add-button" type="submit">Add student</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
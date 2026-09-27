function StudentCard({
  name,
  rollNumber,
  department,
  semester,
  cgpa,
  photo
}) {
  return (
    <div className="student-card">
      {photo ? <img src={photo} alt="" /> : <div className="student-avatar" aria-hidden="true" />}
      <div className="student-info">
        <h2>{name}</h2>
        <p className="student-roll">Roll no. {rollNumber}</p>
        <p className="student-department">{department}</p>
      </div>
      <div className="student-meta">
        <span className="semester-tag">{semester} semester</span>
        <strong className="cgpa-score"><span>CGPA</span>{Number(cgpa).toFixed(1)}</strong>
      </div>
    </div>
  );
}

export default StudentCard;
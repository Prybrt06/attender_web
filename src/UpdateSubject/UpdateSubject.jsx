import { useNavigate } from "react-router-dom";
import "./Update.css";

import { useState } from "react";
import Cookies from "js-cookie";

const UpdateSubject = ({ subject, setDeleteState, setupdHandler }) => {
  const [subjectName, setSubjectName] = useState(subject.name);
  const [totalClasses, setTotalClasses] = useState(subject.totalClasses);
  const [attendedClasses, setAttendedClasses] = useState(
    subject.attendedClasses
  );
  const [subjectCode, setSubjectCode] = useState(subject.subjectCode);

  const navigate = useNavigate();

  const updateSubject = async () => {
    const token = Cookies.get("token");
    const response = await window.confirm(
      `Do you want to update the subject ${subject.name}`
    );

    if (response) {
      const result = await fetch(
        `https://attender-backend.onrender.com/subject/update/${subject.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: subjectName,
            subjectCode: subjectCode,
            attendedClasses: parseInt(attendedClasses),
            totalClasses: parseInt(totalClasses),
          }),
        }
      );

      if (result.status == 201) {
        navigate("/");
        setDeleteState(false);
        setupdHandler((prev) => !prev);
        alert("Subject updated successfully");
      } else {
        alert("Unable to update. Please try again!");
      }
    }
  };

  return (
    <div style={{ transition: "1s ease-in" }}>
      <form id="updateForm" action="">
        <label htmlFor="">Subject name</label>
        <input
          type="text"
          value={subjectName}
          placeholder="subject name"
          onChange={(e) => {
            setSubjectName(e.target.value);
          }}
        />
        <label htmlFor="">Total classes</label>
        <input
          type="number"
          value={totalClasses}
          placeholder="total classes"
          onChange={(e) => {
            setTotalClasses(e.target.value);
          }}
        />
        <label htmlFor="">Attended Classes</label>
        <input
          type="number"
          value={attendedClasses}
          placeholder="attended classes"
          onChange={(e) => {
            setAttendedClasses(e.target.value);
          }}
        />
        <label htmlFor="">Subject Code</label>
        <input
          type="text"
          value={subjectCode}
          placeholder="subject code"
          onChange={(e) => {
            setSubjectCode(e.target.value);
          }}
        />
      </form>
      <section id="buttons">
        <button onClick={updateSubject}>Update</button>
        <button
          onClick={() => {
            setDeleteState(false);
          }}
        >
          Cancel
        </button>
      </section>
    </div>
  );
};

export default UpdateSubject;

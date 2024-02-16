/* eslint-disable react/prop-types */
import Cookies from "js-cookie";
import "./Style.css";

import { useState } from "react";
import UpdateSubject from "../UpdateSubject/UpdateSubject";
import InfoCard from "../InfoCard/InfoCard";

function SubjectCard({ subject, setupdHandler }) {
  // let isAttended = false;
  const [state, setState] = useState(1);
  // 1 - main state
  // 2 - update state
  // 3 - info state

  const markPresent = async (attended) => {
    const response = window.confirm(
      `Do you want to mark the attendance for the subject ${subject.name}`,
    );

    if (response) {
      const token = Cookies.get("token");
      const res = await fetch(
        `https://attender-backend.onrender.com/subject/markAttendance/${subject.id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isAttended: attended }),
        },
      );

      if (res.status == 201) {
        setupdHandler((prev) => !prev);
        alert("Attendance marked successfully");
      } else {
        alert("Unable to mark the attendance please try again");
      }
    }
  };

  const deleteSubject = async () => {
    const response = window.confirm(
      `Do you want to delete the subject ${subject.name}`,
    );

    if (response) {
      const token = Cookies.get("token");
      const res = await fetch(
        `https://attender-backend.onrender.com/subject/delete/${subject.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.status == 201) {
        setupdHandler((prev) => !prev);
        alert("Subject deleted successfully");
      } else {
        alert("Unable to delete the subject please try again");
      }
    }
  };

  const attendance = (
    (subject?.attendedClasses * 100) /
    subject?.totalClasses
  ).toFixed(2);
  console.log("hello");
  console.log(subject);

  return (
    <div className="subject">
      {state === 1 ? (
        <div className="info_div">
          <section id="info">
            <h3>{subject?.name}</h3>
            <div>
              <button
                onClick={() => {
                  setState(3);
                }}
              >
                Info
              </button>
            </div>
          </section>
          <h4
            style={{
              color:
                attendance >= 75
                  ? "green"
                  : attendance >= 50
                    ? "orange"
                    : "red",
            }}
            className="percent"
          >
            {isNaN(attendance) ? 0 : attendance} %
          </h4>
          <ul>
            <li>Total : {subject?.totalClasses}</li>
            <li>Attended : {subject?.attendedClasses}</li>
            <li>
              Missed :{" "}
              {subject?.totalClasses - subject?.attendedClasses}
            </li>
          </ul>
          <h5>{subject?.subjectCode}</h5>
          <section id="buttons">
            <button
              onClick={async () => {
                await markPresent(true);
              }}
            >
              Attended
            </button>
            <button
              onClick={async () => {
                await markPresent(false);
              }}
            >
              Missed
            </button>
            <span></span>
            <button
              onClick={async () => {
                await deleteSubject();
              }}
              style={{ color: "red" }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                setState(2);
              }}
            >
              Update
            </button>
          </section>{" "}
        </div>
      ) : state === 2 ? (
        <UpdateSubject
          subject={subject}
          setState={setState}
          setupdHandler={setupdHandler}
        />
      ) : (
        <InfoCard subject={subject} setState={setState} />
      )}
    </div>
  );
}

export default SubjectCard;

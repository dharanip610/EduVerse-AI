import { FaBookOpen } from "react-icons/fa";

const subjects = [
  "Science",
  "Mathematics",
  "English",
  "Social Science",
  "Coding",
];

export default function SubjectSelector({
  selectedSubject,
  setSelectedSubject,
}) {
  return (
    <div className="subjectSelector">

      <div className="subjectSelectorIcon">
        <FaBookOpen />
      </div>

      <select
        className="subjectDropdown"
        value={selectedSubject}
        onChange={(e) =>
          setSelectedSubject(e.target.value)
        }
      >
        {subjects.map((subject) => (
          <option
            key={subject}
            value={subject}
          >
            {subject}
          </option>
        ))}
      </select>

    </div>
  );
}
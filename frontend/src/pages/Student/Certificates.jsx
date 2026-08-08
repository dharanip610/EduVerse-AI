import { useEffect, useState } from "react";
import { FiDownload, FiEye, FiAward } from "react-icons/fi";
import { supabase } from "../../config/supabase";
import { getCertificates } from "../../services/studentService";
import { previewCertificate, downloadCertificate } from "../../utils/certificateGenerator";
import "../../styles/certificates.css";

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState("");
  useEffect(() => {
    loadCertificates();
  }, []);

  async function loadCertificates() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }
   const { data: student } = await supabase
  .from("students")
  .select("full_name")
  .eq("id", user.id)
  .single();

setStudentName(student?.full_name || "Student");
    const { data, error } = await getCertificates(user.id);

    if (!error) {
      setCertificates(data);
    } else {
      console.error(error);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="certificates-page">
        <h2>Loading Certificates...</h2>
      </div>
    );
  }

  return (
    <div className="certificates-page">
      <div className="certificate-header">
        <h1>🏆 My Certificates</h1>
        <p>Your earned achievements and course certificates.</p>
      </div>

      {certificates.length === 0 ? (
        <div className="certificate-empty">
          <FiAward size={70} />
          <h2>No Certificates Yet</h2>
          <p>Complete quizzes and courses to earn certificates.</p>
        </div>
      ) : (
        <div className="certificate-grid">
          {certificates.map((certificate) => (
            <div className="certificate-card" key={certificate.id}>
              <h2>{certificate.course_name}</h2>

              <p>
                <strong>Subject:</strong> {certificate.subject}
              </p>

              <p>
                <strong>Score:</strong> {certificate.score}%
              </p>

              <p>
                <strong>Grade:</strong> {certificate.grade}
              </p>

              <p>
                <strong>Status:</strong> {certificate.status}
              </p>

              <p>
                <strong>Issued:</strong>{" "}
                {new Date(certificate.issued_at).toLocaleDateString()}
              </p>

              <div className="certificate-actions">
              <button
  onClick={() =>
    previewCertificate({
      ...certificate,
      student_name: studentName,
    })
  }
>
  <FiEye />
  Preview
</button>  

                <button
  onClick={() =>
    downloadCertificate({
      ...certificate,
      student_name: studentName,
    })
  }
>
  <FiDownload />
  Download
</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
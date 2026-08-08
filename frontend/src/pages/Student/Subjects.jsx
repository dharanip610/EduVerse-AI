import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getSubjects } from "../../services/studentService";

import "../../styles/subjects.css";

export default function Subjects() {

    const navigate = useNavigate();

    const [subjects, setSubjects] = useState([]);

    useEffect(() => {

        loadSubjects();

    }, []);

    async function loadSubjects() {

        const { data, error } = await getSubjects();

        if (error) {

            console.log(error);

            return;

        }

        setSubjects(data);

    }

    return (

        <section className="subjects-page">

            <h1>Choose Your Subject</h1>

            <div className="subjects-grid">

                {subjects.map((subject) => (

                    <div
                        key={subject.id}
                        className="subject-card"
                        onClick={() =>
                            navigate(
                                `/subject-details/${subject.id}`
                            )
                        }
                    >

                        <div className="subject-icon">

                            {subject.icon}

                        </div>

                        <h2>

                            {subject.name}

                        </h2>

                        <p>

                            {subject.description}

                        </p>

                    </div>

                ))}

            </div>

        </section>

    );

}
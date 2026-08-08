import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getStudentProfile } from "../services/studentService";

export default function useStudent() {
    const { user } = useAuth();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            setStudent(null);
            setError(null);
            setLoading(false);
            return;
        }

        async function loadStudent() {
            setLoading(true);
            try {
                console.log("AUTH USER:", user);
                const { data, error } = await getStudentProfile(user.id);
                console.log("PROFILE DATA:", data);
                console.log("PROFILE ERROR:", error);
                if (error) {
                    setError(error);
                    setStudent(null);
                } else {
                    setStudent(data);
                    setError(null);
                }
            } catch (err) {
                setError(err);
                setStudent(null);
            } finally {
                setLoading(false);
            }
        }

        loadStudent();
    }, [user]);

    return { student, loading, error };
}

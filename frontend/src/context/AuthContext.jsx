import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../config/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    supabase.auth.getSession().then(({ data }) => {

      setUser(data.session?.user ?? null);

      setLoading(false);

    });

    const {

      data: { subscription },

    } = supabase.auth.onAuthStateChange(

      (_event, session) => {

        setUser(session?.user ?? null);
        setLoading(false);
      }

    );

    return () => subscription.unsubscribe();

  }, []);

  async function login(email, password) {

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error && data.session?.user) {

      setUser(data.session.user);

    } else {

      setUser(null);

    }

    setLoading(false);

    return { data, error };

  }

  // =========================
  // Logout
  // =========================

  async function signOut() {

    const { error } = await supabase.auth.signOut();

    if (error) {

      console.log(error);

      return;

    }

    setUser(null);

    window.location.href = "/login";

  }

  return (

    <AuthContext.Provider

      value={{

        user,

        loading,
        login,
        signOut

      }}

    >

      {children}

    </AuthContext.Provider>

  );

}

export function useAuth() {

  return useContext(AuthContext);

}
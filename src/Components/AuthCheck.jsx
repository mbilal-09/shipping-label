import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const CheckAuth = ({ children }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log("before condition user", user);
      if (!user) {
        navigate("/");
        console.log(user, "useruseruseruser");
      } else {
        navigate("/Dashboard");
      }
    });
    return () => unsubscribe();
  }, [auth, user]);
  return <>{children}</>;
};

export default CheckAuth
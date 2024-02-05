import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";

const CheckAuth = ({ children }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        navigate("/");
      } else {
        navigate("/dashboard");
      }
    });
    return () => unsubscribe();
  }, [auth, user]);
  return <>{children}</>;
};

export default CheckAuth
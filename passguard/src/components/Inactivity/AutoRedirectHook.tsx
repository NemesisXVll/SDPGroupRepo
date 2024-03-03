import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function useAutoRedirect(
  timeoutDuration = 5000,
  redirectPath = "/lock",
  _expanded: boolean
) {
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);

  const location = useLocation();
  const user = location.state.user;

  console.log("User: ", user);

  useEffect(() => {
    let timeoutId: any;

    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setRedirect(true);
      }, timeoutDuration);
    };

    const handleActivity = () => {
      resetTimeout();
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keypress", handleActivity);

    resetTimeout();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keypress", handleActivity);
    };
  }, [timeoutDuration]);

  useEffect(() => {
    if (redirect) {
      navigate(redirectPath, {
        replace: true,
        state: { user, expanded: _expanded },
      });
    }
  }, [redirect, redirectPath, navigate]);

  return { redirect, setRedirect };
}

export default useAutoRedirect;

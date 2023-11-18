import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { useEffect } from "react";

const Logout = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
    props.dispatch(setAuthedUser(null));
  }, [navigate, props]);
  localStorage.clear();
  sessionStorage.clear();
};

export default connect()(Logout);

import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

const Logout = (props) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate("/login");
  }, [navigate]);
  props.dispatch(setAuthedUser(null));
  localStorage.clear();
  sessionStorage.clear();
};

export default connect()(Logout);

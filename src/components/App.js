import { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import LeaderBoard from "./LeaderBoard";
import Nav from "./Nav";
import NewQuestion from "./NewQuestion";
import QuestionPage from "./QuestionPage";
import Login from "./Login";
import Page404 from "./Page404";
import { handleInitialData } from "../actions/shared";
import Logout from "./Logout";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, [props]);
  return (
    <div className="container">
      <Nav />
      {props.authedUser ? (
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/add" element={<NewQuestion />} />
          <Route path="/question/:id" element={<QuestionPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="logout" element={<Logout />} />
          <Route path="/404" element={<Page404 />} />
        </Routes>
      ) : (
        <Routes>
          <Route path={"/login"} element={<Login />} />
        </Routes>
      )}
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser: authedUser !== null,
});

export default connect(mapStateToProps)(App);

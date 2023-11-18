import React from "react";
import { connect } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";
import { Avatar } from "@mui/material";

const NavButton = (props) => {
  return (
    <Link
      to={props.href}
      style={{ color: "inherit", textDecoration: "inherit" }}
    >
      <Button
        sx={{
          ":hover": {
            bgcolor: "#1C8FF4",
            color: "white",
          },
          width: "90px",
          bgcolor: "#157BD5",
          color: "white",
        }}
      >
        {props.text}
      </Button>
    </Link>
  );
};

const Nav = (props) => {
  const location = useLocation();
  return (
    <div>
      <AppBar position="static" color="inherit" enableColorOnDark>
        <Toolbar>
          <Stack
            direction="row"
            spacing={{ xs: 3, sm: 6, md: 9 }}
            justifyContent="center"
            alignItems="center"
          >
            <Stack direction="row" spacing={1}>
              {props.userLoggedIn === true && (
                <Stack direction="row" spacing={2}>
                  <NavButton text="Home" href="/" />
                  <NavButton
                    text="Leaderboard"
                    href="leaderboard"
                  />
                  <NavButton
                    text="New"
                    href="/add"
                  />
                </Stack>
              )}
            </Stack>
            {props.userLoggedIn === true ? (
              <Stack direction="row" spacing={2}>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Avatar
                    variant="circular"
                    sx={{ width: 24, height: 24 }}
                    src={props.users[props.authedUser].avatarURL}
                  />
                  <Typography fontSize="16px" fontWeight={"bold"}>
                    {props.users[props.authedUser].name}
                  </Typography>
                </Stack>
                <NavButton text="Logout" href="logout" />
              </Stack>
            ) : (
              <Stack direction="row" spacing={2}>
                <NavButton
                  text="Log In"
                  color="green"
                  href={"/login?redirectTo=" +
                    location.pathname
                  }
                />
              </Stack>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  authedUser,
  userLoggedIn: authedUser !== null,
  users,
});

export default connect(mapStateToProps)(Nav);

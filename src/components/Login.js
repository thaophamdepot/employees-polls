import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { IconButton, InputAdornment, MenuItem, Select } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { connect } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import { setAuthedUser } from "../actions/authedUser";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const theme = createTheme();

const Login = (props) => {
  const navigate = useNavigate();
  const search = useLocation().search;

  const [usernameValue, setUsernameValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const { users } = props;

  const handleUsernameChange = (e) => {
    setUsernameValue(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = usernameValue;
    const password = passwordValue;

    if (username === "" || users[username].password !== password) {
      setError(true);
    } else if (users[username]) {
      new Promise((res, rej) => {
        setTimeout(() => res(), 300);
      }).then(() => {
        props.dispatch(setAuthedUser(username));
        setError(false);
        const redirectTo = new URLSearchParams(search).get("redirectTo");
        redirectTo && redirectTo !== ""
          ? navigate(redirectTo)
          : navigate("/");
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" fontWeight={"bold"}>
            Log In
          </Typography>
          {error && (
            <Typography
              color="error"
              className={"Error"}
              data-testid="error-header"
            >
              &nbsp;{"User name and password is incorrect!"}&nbsp;
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <label>User:</label>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              label="Username"
              value={usernameValue}
              onChange={handleUsernameChange}
            >
              {Object.keys(users).map((item) => (
                <MenuItem key={users[item].id} value={users[item].id}>
                  {users[item].name}
                </MenuItem>
              ))}
            </Select>
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              value={passwordValue}
              onChange={handlePasswordChange}
              type={showPassword ? "text" : "password"}
              id="password"
              data-testid="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              data-testid="sign-in"
              color="primary"
            >
              <span style={{fontWeight: "bold"}}>Log In</span>
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser: authedUser !== null,
    users,
  };
}

export default withRouter(connect(mapStateToProps)(Login));

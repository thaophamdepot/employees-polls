import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { handleNewQuestion } from "../actions/questions";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const theme = createTheme();

const NewQuestion = (props) => {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const optionOne = data.get("optionOne");
    const optionTwo = data.get("optionTwo");
    if (optionOne.trim() === "") {
      console.error("First option is empty.");
    } else if (optionTwo.trim() === "") {
      console.error("First option is empty.");
    } else {
      new Promise((res, rej) => {
        props.dispatch(
          handleNewQuestion(optionOne, optionTwo, props.authedUser)
        );
        setTimeout(() => res("success"), 1000);
      }).then(() => {
        navigate("/");
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Would you rather</Typography>
          <Typography variant="h6">Create Your Own Poll</Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="optionOne"
              placeholder="Option One"
              name="optionOne"
              autoComplete="optionOne"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="optionTwo"
              type="optionTwo"
              id="optionTwo"
              placeholder="Option Two"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  return {
    authedUser,
    users,
  };
};

export default connect(mapStateToProps)(NewQuestion);

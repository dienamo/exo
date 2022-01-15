import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ButtonAppBar({ text }) {
  const user = React.useContext(UserContext);
  const { username } = user;
  const history = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/logout", { withCredentials: true })
      .then(() => {
        history("/");
        // window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My MoviesDataBase
          </Typography>
          {!user ? (
            <>
              <Link to="/login">
                <Button
                  variant="contained"
                  href="#contained-buttons"
                  color="success"
                >
                  Connexion
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  variant="contained"
                  href="#contained-buttons"
                  color="success"
                >
                  Inscription
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Welcome {username}
              </Typography>
              <Button
                variant="contained"
                href="#contained-buttons"
                color="success"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

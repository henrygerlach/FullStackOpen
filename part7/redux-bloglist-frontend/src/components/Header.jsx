import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { revokeUser } from "../reducers/userReducer";

const Header = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(revokeUser());
    window.localStorage.removeItem("user");
  };

  const style = {
    backgroundColor: "lightGrey",
  };

  return (
    <div>
      <h2>blogs</h2>
      <p style={style}>
        <Link to={"/"}>blogs</Link> <Link to={"/users"}>users</Link> {user.name}{" "}
        logged in
        <button onClick={handleLogout}>logout</button>
      </p>
    </div>
  );
};

export default Header;

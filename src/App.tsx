import { NavLink, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <header>HEADER</header>
      <Outlet />
      <footer>
        FOOTER
        <NavLink className={"m-2"} to={"/"}>
          HOME
        </NavLink>
        <NavLink className={"m-2"} to={`/podcast/${3}`}>
          DETAILS
        </NavLink>
        <NavLink className={"m-2"} to={`/podcast/${3}/episode/${2}`}>
          EPISODE
        </NavLink>
      </footer>
    </>
  );
}

export default App;

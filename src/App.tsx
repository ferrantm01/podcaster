import { NavLink, Outlet } from "react-router-dom";
import { Header } from "./components/header/header";

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
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

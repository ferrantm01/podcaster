import { Link, Outlet } from "react-router-dom";
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
        <Link className={"m-2"} to={"/"}>
          HOME
        </Link>
        <Link className={"m-2"} to={`/podcast/${3}`}>
          DETAILS
        </Link>
        <Link className={"m-2"} to={`/podcast/${3}/episode/${2}`}>
          EPISODE
        </Link>
      </footer>
    </>
  );
}

export default App;

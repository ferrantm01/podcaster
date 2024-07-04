import { Outlet } from "react-router-dom";
import { Header } from "./components/header/header";

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}

export default App;

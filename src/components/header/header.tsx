import { Link } from "react-router-dom"

export const Header = () => {
  return (
    <header>
      <Link to={"/"} className="header-link">
        <h1>Podcaster</h1>
      </Link>
    </header>
  )
}

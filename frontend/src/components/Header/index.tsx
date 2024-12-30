import { Link } from "react-router-dom";


const Header = () => {
  return (
    <header className="p-4">
      <nav className="max-w-7xl mx-auto flex justify-between items-center text-white">
        <div className="text-2xl font-bold">Auto Escola</div>
        <div className="space-x-6">
          <Link to="/users" className="hover:text-gray-300">Alunos</Link>
          <Link to="/classes" className="hover:text-gray-300">Aulas</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
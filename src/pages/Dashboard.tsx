import { Outlet, Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">𓆩⚔𓆪Task Manager Pro 𓆩⚔𓆪</h1>
      </header>

      {/* Menu de navegação */}
      <nav className="dashboard-nav">
        <Link to="overview" className="dashboard-link">
          Overview
        </Link>
        <Link to="tasks" className="dashboard-link">
          Tasks
        </Link>
      </nav>

      {/* Aqui entram as rotas filhas testegit */}
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}

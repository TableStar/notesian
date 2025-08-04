import { Outlet } from "react-router";

const Sidebar = () => {
  return (
    <div className="w-50 border-r p-4">
      <h2>MuhKost</h2>
      <nav>
        <ul>
          <li>Dashboard</li>
          <li>Rooms</li>
          <li>Settings</li>
        </ul>
      </nav>
    </div>
  );
}

export const DashLayout = () => {
  return (
    <div className="flex h-25">
        <Sidebar/>
        <main className="flex p-4">
            <Outlet/>
        </main>
    </div>
  )
}

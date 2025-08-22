import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import "../basic.css";

interface LayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "Purchases", href: "/purchases" },
  { name: "Transfers", href: "/transfers" },
  { name: "Assignments", href: "/assignments" },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div>
      <div className="nav-header">
        <h1 className="nav-title">Military Asset Management</h1>
        <div className="nav-links">
          {navigation.map((item) => (
            <Link key={item.name} to={item.href}>
              {item.name}
            </Link>
          ))}
        </div>
        <div className="nav-user">Admin User</div>
      </div>
      <div className="main-content">{children}</div>
    </div>
  );
}

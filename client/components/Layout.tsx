import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

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
      <div>
        <h1>Military Asset Management</h1>
        <div>
          {navigation.map((item) => (
            <Link key={item.name} to={item.href}>
              {item.name}
            </Link>
          ))}
        </div>
        <div>Admin User</div>
      </div>
      <div>{children}</div>
    </div>
  );
}

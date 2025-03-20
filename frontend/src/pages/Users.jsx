import { useOutletContext } from "react-router-dom";

const Users = () => {
  const { isCollapsed } = useOutletContext();

  return (
    <main className={isCollapsed ? "collapsed" : ""}>
      <h1 className="text-center">Usuarios</h1>
    </main>
  );
};

export default Users;

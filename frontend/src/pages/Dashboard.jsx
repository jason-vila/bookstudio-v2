import { useOutletContext } from "react-router-dom";

const Dashboard = () => {
  const { isCollapsed } = useOutletContext();

  return (
    <main className={isCollapsed ? "collapsed" : ""}>
      <h1 className="text-center">Dashboard</h1>
    </main>
  );
};

export default Dashboard;

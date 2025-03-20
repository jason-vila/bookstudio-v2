import { useOutletContext } from "react-router-dom";

const Loans = () => {
  const { isCollapsed } = useOutletContext();

  return (
    <main className={isCollapsed ? "collapsed" : ""}>
      <h1 className="text-center">Préstamos</h1>
    </main>
  );
};

export default Loans;

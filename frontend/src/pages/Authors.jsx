import { useOutletContext } from "react-router-dom";

const Authors = () => {
  const { isCollapsed } = useOutletContext();

  return (
    <main className={isCollapsed ? "collapsed" : ""}>
      <h1 className="text-center">Autores</h1>
    </main>
  );
};

export default Authors;

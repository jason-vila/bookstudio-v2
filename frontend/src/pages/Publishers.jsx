import { useOutletContext } from "react-router-dom";

const Publishers = () => {
  const { isCollapsed } = useOutletContext();

  return (
    <main className={isCollapsed ? "collapsed" : ""}>
      <h1 className="text-center">Editoriales</h1>
    </main>
  );
};

export default Publishers;

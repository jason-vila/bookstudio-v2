import { useOutletContext } from "react-router-dom";

const Students = () => {
  const { isCollapsed } = useOutletContext();

  return (
    <main className={isCollapsed ? "collapsed" : ""}>
      <h1 className="text-center">Estudiantes</h1>
    </main>
  );
};

export default Students;

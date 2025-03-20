import { useOutletContext } from "react-router-dom";

const Courses = () => {
  const { isCollapsed } = useOutletContext();

  return (
    <main className={isCollapsed ? "collapsed" : ""}>
      <h1 className="text-center">Cursos</h1>
    </main>
  );
};

export default Courses;
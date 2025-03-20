import { useOutletContext } from "react-router-dom";

const Books = () => {
  const { isCollapsed } = useOutletContext();

  return (
    <main className={isCollapsed ? "collapsed" : ""}>
      <h1 className="text-center">Libros</h1>
    </main>
  );
};

export default Books;

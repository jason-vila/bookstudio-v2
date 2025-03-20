import { useOutletContext } from "react-router-dom";

const Profile = () => {
  const { isCollapsed } = useOutletContext();

  return (
    <main className={isCollapsed ? "collapsed" : ""}>
      <h1 className="text-center">Perfil</h1>
    </main>
  );
};

export default Profile;

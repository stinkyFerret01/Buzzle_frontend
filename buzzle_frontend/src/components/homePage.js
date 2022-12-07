import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <main>
      <button onClick={() => navigate("/game")}>game</button>
    </main>
  );
};
export default HomePage;

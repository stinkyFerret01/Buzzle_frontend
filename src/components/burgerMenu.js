import { useNavigate } from "react-router-dom";

const BurgerMenu = () => {
  const navigate = useNavigate();

  return (
    <section>
      <button
        onClick={() => {
          navigate("/");
        }}
      ></button>
    </section>
  );
};

export default BurgerMenu;

import { useDarkMode } from "../contexts/DarkModeContext";

function Logo() {
  const { isDarkMode } = useDarkMode();

  const src = isDarkMode ? "/logoipsum-dark.svg" : "/logoipsum-light.svg";

  return (
    <div>
      <img src={src} alt="Logo" className="mx-auto mb-6" />
    </div>
  );
}

export default Logo;

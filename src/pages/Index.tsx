import { useState, useEffect } from "react";
import { Desktop } from "@/components/Desktop";
import { Login } from "@/components/Login";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Apply theme to document
    if (theme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, [theme]);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <Desktop 
      onLogout={() => setIsLoggedIn(false)} 
      theme={theme}
      onThemeChange={setTheme}
    />
  );
};

export default Index;

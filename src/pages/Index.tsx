import { useState, useEffect } from "react";
import { Desktop } from "@/components/Desktop";
import { Login } from "@/components/Login";
import { SystemProvider } from "@/contexts/SystemContext";

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
    <SystemProvider>
      <Desktop 
        onLogout={() => setIsLoggedIn(false)} 
        theme={theme}
        onThemeChange={setTheme}
      />
    </SystemProvider>
  );
};

export default Index;

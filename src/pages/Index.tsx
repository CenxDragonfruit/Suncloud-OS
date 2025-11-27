import { useState, useEffect } from "react";
import { Desktop } from "@/components/Desktop";
import { Login } from "@/components/Login";
import { SystemProvider } from "@/contexts/SystemContext";
import { AudioProvider } from "@/contexts/AudioContext";

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

  return (
    <AudioProvider>
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <SystemProvider>
          <Desktop 
            onLogout={() => setIsLoggedIn(false)} 
            theme={theme}
            onThemeChange={setTheme}
          />
        </SystemProvider>
      )}
    </AudioProvider>
  );
};

export default Index;

import React, { createContext, useContext, useState } from "react";
import roiLightTheme from "../themes/roi-light.json";
import roiDarkTheme from "../themes/roi-dark.json";

const RoiThemeContext = createContext();

export const RoiThemeProvider = ({ children }) => {
  // boolean isDark;
  const [isDark, setIsDark] = useState(false);

  // Toggle method for light/dark modes.
  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Get theme values.
  const theme = (isDark) ? roiDarkTheme : roiLightTheme;

  // Return component.
  return (
    <RoiThemeContext.Provider value={{ theme, isDarkTheme: isDark, toggleTheme }}>
      {children}
    </RoiThemeContext.Provider>
  );
}

export const useRoiTheme = () => useContext(RoiThemeContext);

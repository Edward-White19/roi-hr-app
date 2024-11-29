import React, { createContext, useContext, useState } from "react";
import roiCoreTheme from "../themes/roi-core.json";
import roiLightTheme from "../themes/roi-light.json";
import roiDarkTheme from "../themes/roi-dark.json";

/** Theme context for ROI style. */
const RoiThemeContext = createContext();

/** Theme provider for ROI style. */
export const RoiThemeProvider = ({ children }) => {
  // boolean isDark;
  const [isDark, setIsDark] = useState(false);

  // Toggle method for light/dark modes.
  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Get theme values.
  //const theme = (isDark) ? roiDarkTheme : roiLightTheme;
  const theme = roiCoreTheme;

  // Return component.
  return (
    <RoiThemeContext.Provider value={{ theme, isDarkTheme: isDark, toggleTheme }}>
      {children}
    </RoiThemeContext.Provider>
  );
}

/** Theme getter for ROI style. */
export const useRoiTheme = () => useContext(RoiThemeContext);

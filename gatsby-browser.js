import React from "react";
import { ColorProvider } from "./src/contexts/ColorContext";

export const wrapRootElement = ({ element }) => (
  <ColorProvider>{element}</ColorProvider>
);

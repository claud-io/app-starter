import React from "react";
import { AuthContext } from "../provider";

export const useAuth = () => React.useContext(AuthContext);

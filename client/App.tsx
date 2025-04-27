import React from "react";
import { SafeArea } from "./src/components/SafeArea";

import Routes from "./src/services/routes";
import { AuthProvider } from "./src/services/context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
        <SafeArea>
          <Routes />
        </SafeArea>
    </AuthProvider>
  );
}

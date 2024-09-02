import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ProtectedRoute from "./routes/protectedRoutes/ProtectedRoute"
import { ChakraProvider } from "@chakra-ui/react"
import GuestRoute from './routes/guestRoutes/GuestRoute';
import Layout from './components/layout/Layout';
 
function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          {/* RUTAS PUBLICAS */}
          <Route path="/login" element={
            <GuestRoute>
              <Login/>
            </GuestRoute>
          }/>
          
          {/* RUTAS PROTEGIDAS */}
          <Route path="/" element={
            <Layout>
              <ProtectedRoute>
                <Home/>
              </ProtectedRoute>
            </Layout>
          }/>

        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

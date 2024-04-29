import PageContextProvider from "./context/pizzas.context"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from "./components/nav"
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import PizzaDetail from "./pages/Pizza-detail";
import React from "react";

interface RouteConfig {
    path: string;
    element: React.ReactNode;
}

const routes: RouteConfig[] = [
    { path: '/', element: <Home /> },
    { path: '/cart', element: <Cart /> },
    { path: '/:pizzaID', element: <PizzaDetail /> }
];

function App() {

  return (
    <>
      <PageContextProvider>
        <Router>
            <Nav></Nav>
            <Routes>
                {routes.map((route) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}
            </Routes>
        </Router>
      </PageContextProvider>
      
    </>
  )
}

export default App

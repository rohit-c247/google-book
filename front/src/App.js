import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
// import { AppRouter } from "./config/AppRouter";
import { getToken } from "./Helpers";
import Layout from "./common/components/Layout";
import BookDetail from "./pages/bookDetail";
import BookList from "./pages/bookList";
import Login from "./pages/login";
import Page404 from "./pages/Page404";

const App = () => {
  const ProtectedRoute = ({ redirectPath = "/", children }) => {
    if (!getToken()) {
      return <Navigate to={redirectPath} replace />;
    }
    return children;
  };
  return (
    <Routes>
      <Route
        path="/"
        exact={true}
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
      <Route
        path="/books"
        exact={true}
        element={
          <ProtectedRoute>
            <Layout>
              <BookList />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/book/:id"
        exact={true}
        element={
          <ProtectedRoute>
            <Layout>
              <BookDetail />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <Layout>
            <Page404 />
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;

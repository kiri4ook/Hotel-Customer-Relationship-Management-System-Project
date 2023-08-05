import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from "./components/main-layout/MainLayout";
import AuthorizationPage from './pages/authorization-page/AuthorizationPage';
import MainPage from './pages/main-page/MainPage';
import PrivateGuard from './components/PrivateRoute';
import RoomPage from './pages/room-page/RoomPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthorizationPage />} />
        <Route exact path="/home"
          element={
            <PrivateGuard>
              <MainLayout>
                <MainPage />
              </MainLayout>
            </PrivateGuard>} />
        <Route path="/room/:roomId"
          element={
            <MainLayout>
              <RoomPage />
            </MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;


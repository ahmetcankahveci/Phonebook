// App.tsx

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Phonebook from './components/PhonebookMain';

const MainContent: React.FC = () => {
  return (
    <>
      <h2>Main Content</h2>
      <p>This is the main content area.</p>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/Phonebook" element={<Phonebook />} /> {/* Phonebook bileşeni doğru şekilde Route içine alındı */}
            <Route path="/" element={<MainContent />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

// App.js 또는 최상위 컴포넌트
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home'; // Home 컴포넌트 경로 확인해주세요
import ButtonControl from './Pages/button'; // 파일 경로가 정확한지 확인해주세요

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buttonControl" element={<ButtonControl />} />
          {/* 다른 경로에 대한 Route 추가 */}
        </Routes>
      </Router>
  );
}

export default App;

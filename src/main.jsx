import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// นำเข้า ErrorBoundary เพื่อดักจับ Error และป้องกันหน้าจอขาว
import ErrorBoundary from './components/ui/ErrorBoundary.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);

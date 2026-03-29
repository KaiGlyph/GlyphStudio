import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';
import './styles/course-shared.css';
import './styles/courses/javascript.css';
import './styles/courses/python.css';
import './styles/courses/react.css';
import './styles/courses/typescript.css';
import './styles/courses/ladder.css';
import './styles/courses/plcs.css';
import './styles/courses/tiaportal.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
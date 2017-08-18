import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './serviceWorkerDev';

// Import styles react-mdl.
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

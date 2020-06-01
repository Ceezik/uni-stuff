import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { SocketProvider } from './utils/useSocket';

ReactDOM.render(
    <SocketProvider>
        <App />
    </SocketProvider>,
    document.getElementById('root')
);

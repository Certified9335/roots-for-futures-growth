
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Simply render the App component without additional providers
createRoot(document.getElementById("root")!).render(<App />);

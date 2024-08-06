import { createRoot } from 'react-dom/client';
import App from './components/App';

const root = createRoot(document.getElementById('app') as Element);
root.render(<App />);

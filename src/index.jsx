import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RouterCustom } from './router';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <RouterCustom />
    </BrowserRouter>
);

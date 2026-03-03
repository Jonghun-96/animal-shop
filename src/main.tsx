
import './main.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </StrictMode>
  </Provider>
)

import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Router/router'
import { store } from './Store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)
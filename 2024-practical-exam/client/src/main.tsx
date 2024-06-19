import ReactDOM from 'react-dom/client'
import App from '@/App.tsx'
import '@/index.css'
import PersistentProvider from './contexts/PersistenceProvider'
import { RecoilRoot } from 'recoil'

/* 
    Root App component wrapped in RecoilRoot and PersistentProvider, with rendering 
    */
ReactDOM.createRoot(document.getElementById('root')!).render(
    <PersistentProvider>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </PersistentProvider>
)
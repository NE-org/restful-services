import ReactDOM from 'react-dom/client'
import App from '@/App.tsx'
import '@/index.css'
import PersistentProvider from './contexts/PersistenceProvider'
import { RecoilRoot } from 'recoil'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <PersistentProvider>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </PersistentProvider>
)
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Overview from './pages/Overview'
import Tasks from './pages/Tasks'
import {TaskProvider} from './context/TaskProvider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <TaskProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing/>} />
      
          <Route path='/dashboard' element={<Dashboard />}>
            {/* rotas filhas que vão renderizar no <Outlet /> */}
            <Route path='overview' element={<Overview />} />
            <Route path='tasks' element={<Tasks />} />
          </Route>
    </Routes>
    </BrowserRouter>
    </TaskProvider>
   
  )
}

export default App

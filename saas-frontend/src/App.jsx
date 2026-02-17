import {Routes, Route} from 'react-router-dom';
import './App.css'
import AppLayout from './layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Members from './pages/Members';
import Upgrade from './pages/Upgrade';
import Settings from './pages/Settings';
import Join from './pages/Join';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import Signup from './pages/Signup';

const App = () => {
  return (
<Routes>
  {/* public */}
  <Route path='/signup' element={<Signup/>} />
  <Route path="/login" element={<Login />} />
  <Route path="/join/:token" element={<Join />} />

  {/* protected */}
  <Route element={ <AuthProvider> <ProtectedRoute><AppLayout/></ProtectedRoute></AuthProvider>}>
    <Route index element={<Dashboard/>} />
    <Route path="projects" element={<Projects/>} />
    <Route path="members" element={<Members/>} />
    <Route path="settings" element={<Settings/>} />
    <Route path="upgrade" element={<Upgrade/>} />
  </Route>
</Routes>
  )
}

export default App
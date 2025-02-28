import './App.css';
import Rotas from '../src/Rotes/routes'
import { GoogleOAuthProvider } from '@react-oauth/google';



function App() {

  const clientId = "636032764374-7icmqlg7qvj4dabq8fmcacsp24k607pq.apps.googleusercontent.com"

  
  return (
    <div className="App">
      <GoogleOAuthProvider clientId={clientId} >
        <Rotas />
      </GoogleOAuthProvider>;
    </div>
  )
}

export default App;


import './App.css';
import MainAppRoutes from './appRoutes/MainRoute';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <div className="App" >
       <SnackbarProvider maxSnack={3}>
        <MainAppRoutes />
       </SnackbarProvider>
    </div>
  );
}

export default App;

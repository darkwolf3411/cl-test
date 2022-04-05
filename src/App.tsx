import Layout from "./pages/Layout";
import { SnackbarProvider } from 'notistack';

const App = () => {
  return (
    <div>
      <SnackbarProvider maxSnack={3}>
        <Layout />
      </SnackbarProvider>
    </div>
  );
};

export default App;

import { RouterProvider } from 'react-router-dom';
import './App.css';
import { createAppRouter } from './main-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUser } from './globalState/userStore';

const queryClient = new QueryClient();

function App() {
  const user = useUser();
  const token = user?.token;
  const router = createAppRouter(token);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

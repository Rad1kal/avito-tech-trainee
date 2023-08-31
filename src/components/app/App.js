import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy} from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import './App.css';
import MainPage from '../MainPage/MainPageAdaptive';

const GamePage = lazy(() => import('../GamePage/GamePage.js'));


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <MainPage  />
          } />
          <Route path="/card/:cardId" element={
            <Suspense fallback={<div>Loading...</div>}>
              <GamePage queryClient={queryClient}/>
            </Suspense>
          } />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

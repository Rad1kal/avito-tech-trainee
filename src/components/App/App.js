import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import MainPage from '../MainPage/MainPageAdaptive';
import GamePage from '../GamePage/GamePage';

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
            <GamePage queryClient={queryClient}/>
          } />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

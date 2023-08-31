import React  from 'react';
import { useMediaQuery } from 'react-responsive';
import { Suspense, lazy} from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const MainPage = lazy(() => import('./MainPage.js'));
export default function MainPageAdaptive() {

  const isDesktop = useMediaQuery({ minWidth: 1401 });
  const isLaptop = useMediaQuery({ maxWidth: 1400, minWidth: 922 });
  const isTablet = useMediaQuery({ maxWidth: 922, minWidth: 700 });
  const isMobile = useMediaQuery({ maxWidth: 700 });

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        { isDesktop && <MainPage gameGrid={14} filterGrid={2}/>}
        { isLaptop && <MainPage gameGrid={13} filterGrid={3}/>}
        { isTablet && <MainPage gameGrid={12} filterGrid={4}/>}
        { isMobile && <MainPage gameGrid={11} filterGrid={5}/>}
      </Suspense>
    </QueryClientProvider>
  )
}

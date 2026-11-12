import type { ReactNode } from 'react';
import { Layout } from './components/Layout';
import { useRoute, to } from './lib/router';
import { StoreProvider } from './lib/store';
import { DashboardPage } from './pages/Dashboard';
import { HelpPage } from './pages/Help';
import { HomePage } from './pages/Home';
import { LessonPage } from './pages/LessonPage';
import { RegistersPage } from './pages/Registers';
import { ReviewPage } from './pages/Review';
import { SettingsPage } from './pages/Settings';
import { SpeakingPage } from './pages/Speaking';
import { AcademyPage, AreaPage, JapanPage, ModulePage, WorldPage, WorldsPage } from './pages/Tracks';

function page(route: string[]): ReactNode {
  const [section, id] = route;
  switch (section) {
    case undefined: return <HomePage />;
    case 'academia': return id ? <ModulePage id={id} /> : <AcademyPage />;
    case 'leccion': return <LessonPage key={id} id={id ?? ''} />;
    case 'mundos': return id ? <WorldPage id={id} /> : <WorldsPage />;
    case 'japon': return id ? <AreaPage id={id} /> : <JapanPage />;
    case 'registros': return <RegistersPage />;
    case 'ayuda': return <HelpPage />;
    case 'repaso': return <ReviewPage />;
    case 'hablar': return <SpeakingPage />;
    case 'panel': return <DashboardPage />;
    case 'ajustes': return <SettingsPage />;
    default: return (
      <section className="empty">
        <h1>Esta página no existe</h1>
        <p>Puede que el enlace esté incompleto.</p>
        <a className="btn btn-main" href={to('/')}>Volver al inicio</a>
      </section>
    );
  }
}

export function App() {
  const route = useRoute();
  return (
    <StoreProvider>
      <Layout route={route}>{page(route)}</Layout>
    </StoreProvider>
  );
}

import React, { useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import { LangContext } from './i18n/useLangContext';
import { DEFAULT_LOCALE } from './i18n/translations';
import { SupportedLanguages } from './i18n/translations.type';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import WizardPage from './pages/WizardPage';
import LoadingPage from './pages/LoadingPage';
import ResultPage from './pages/ResultPage';

export default function App() {
  const [lang, setLang] = useState<SupportedLanguages>(DEFAULT_LOCALE);
  const langContextValue = useMemo(() => ({ lang, setLang }), [lang]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LangContext.Provider value={langContextValue}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/test" element={<WizardPage />} />
              <Route path="/loading/:typeCode" element={<LoadingPage />} />
              <Route path="/result/:typeCode" element={<ResultPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </LangContext.Provider>
    </ThemeProvider>
  );
}

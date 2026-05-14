import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { LangContext } from '../i18n/useLangContext';
import WizardPage from './WizardPage';
import { NUM_QUESTIONS } from '../bti/questions';

function renderWizard(initialPath = '/test') {
  return render(
    <LangContext.Provider value={{ lang: 'en', setLang: () => {} }}>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/test" element={<WizardPage />} />
          <Route path="/loading/:typeCode" element={<div data-testid="result-stub" />} />
        </Routes>
      </MemoryRouter>
    </LangContext.Provider>,
  );
}

describe('WizardPage', () => {
  test('next button is disabled until an option is chosen', () => {
    renderWizard();
    const next = screen.getByTestId('wizard-next-button');
    expect(next).toBeDisabled();
  });

  test('prev button is disabled on first question', () => {
    renderWizard();
    expect(screen.getByTestId('wizard-prev-button')).toBeDisabled();
  });

  test('after choosing an option, next is enabled and moves forward', async () => {
    const user = userEvent.setup();
    renderWizard();
    await user.click(screen.getByTestId('wizard-option-0'));
    const next = screen.getByTestId('wizard-next-button');
    expect(next).toBeEnabled();
    expect(screen.getByTestId('wizard-progress-text').textContent).toContain('1');
    await user.click(next);
    expect(screen.getByTestId('wizard-progress-text').textContent).toContain('2');
  });

  test('going back preserves the previously chosen option', async () => {
    const user = userEvent.setup();
    renderWizard();
    await user.click(screen.getByTestId('wizard-option-1'));
    await user.click(screen.getByTestId('wizard-next-button'));
    await user.click(screen.getByTestId('wizard-prev-button'));
    const next = screen.getByTestId('wizard-next-button');
    expect(next).toBeEnabled();
  });

  test('answering all questions navigates to a result', async () => {
    const user = userEvent.setup();
    renderWizard();
    for (let i = 0; i < NUM_QUESTIONS; i++) {
      await user.click(screen.getByTestId('wizard-option-0'));
      await user.click(screen.getByTestId('wizard-next-button'));
    }
    expect(await screen.findByTestId('result-stub')).toBeInTheDocument();
  });
});

import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Force English locale so assertions are deterministic regardless of browser
  // language defaults.
  await page.goto('/?lang=en');
});

test('home page renders the start CTA', async ({ page }) => {
  await expect(page.getByTestId('start-test-button')).toBeVisible();
  await expect(
    page.getByRole('heading', { name: /Poker BTI/i, level: 2 }),
  ).toBeVisible();
});

test('completes the wizard and shows a valid result type', async ({ page }) => {
  await page.getByTestId('start-test-button').click();
  await expect(page.getByTestId('wizard-progress-text')).toContainText('1');

  // Next is disabled until an option is picked
  await expect(page.getByTestId('wizard-next-button')).toBeDisabled();

  for (let i = 0; i < 12; i++) {
    await expect(page.getByTestId('wizard-progress-text')).toContainText(
      `${i + 1}`,
    );
    // Alternate options to exercise both poles
    const option = i % 2 === 0 ? 0 : 1;
    await page.getByTestId(`wizard-option-${option}`).click();
    await page.getByTestId('wizard-next-button').click();
  }

  await expect(page.getByTestId('result-page')).toBeVisible();
  const code = await page.getByTestId('result-type-code').textContent();
  expect(code).toMatch(/^[NM][SC][GV][IT]$/);

  await expect(page.getByTestId('result-type-name')).toBeVisible();
});

test('wizard previous button preserves answers and navigates back', async ({ page }) => {
  await page.getByTestId('start-test-button').click();

  await page.getByTestId('wizard-option-1').click();
  await page.getByTestId('wizard-next-button').click();

  await expect(page.getByTestId('wizard-progress-text')).toContainText('2');

  await page.getByTestId('wizard-prev-button').click();
  await expect(page.getByTestId('wizard-progress-text')).toContainText('1');
  // Going forward again should be enabled immediately (selection retained)
  await expect(page.getByTestId('wizard-next-button')).toBeEnabled();
});

test('language switcher updates UI to Chinese', async ({ page }) => {
  await page.getByTestId('language-menu-button').click();
  await page.getByTestId('language-option-zh').click();
  await expect(page.getByTestId('start-test-button')).toContainText('开始测试');
});

test('retake from the result returns to the wizard', async ({ page }) => {
  // Jump straight to a known result via the URL
  await page.goto('/result/NSGI?lang=en');
  await expect(page.getByTestId('result-type-code')).toHaveText('NSGI');
  await page.getByTestId('result-retake-button').click();
  await expect(page.getByTestId('wizard-progress-text')).toContainText('1');
});

test('header share button opens dialog showing the home URL (not the current page)', async ({ page }) => {
  await page.goto('/result/NSGI?lang=en');
  await page.getByTestId('header-share-button').click();
  const dialog = page.getByTestId('share-dialog');
  await expect(dialog).toBeVisible();
  const linkField = dialog.getByTestId('share-link-field').locator('input');
  const url = await linkField.inputValue();
  // Must be the bare home URL — no hash route, no query.
  expect(url).not.toContain('#');
  expect(url).not.toContain('?');
  expect(url).toMatch(/^https?:\/\//);
  await expect(dialog.getByTestId('share-qrcode')).toBeVisible();
});

test('result page share button opens the same dialog', async ({ page }) => {
  await page.goto('/result/MCVT?lang=en');
  await page.getByTestId('result-share-button').click();
  await expect(page.getByTestId('share-dialog')).toBeVisible();
  await expect(page.getByTestId('share-qrcode')).toBeVisible();
});

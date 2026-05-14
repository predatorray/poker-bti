import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useT } from '../i18n/useLangContext';
import Footer from '../components/Footer';

export default function HomePage() {
  const t = useT();

  return (
    <>
    <title>{`${t.app_title} — ${t.app_subtitle}`}</title>
    <meta name="description" content={t.app_description} />
    <meta property="og:title" content={`${t.app_title} — ${t.app_subtitle}`} />
    <meta property="og:description" content={t.app_description} />
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 4, sm: 8 },
      }}
    >
      <Stack spacing={4} alignItems="center" sx={{ maxWidth: 560, width: '100%' }}>
        <Box textAlign="center">
          <Typography
            variant="overline"
            sx={{ color: 'text.secondary', letterSpacing: '0.18em' }}
          >
            {t.app_subtitle}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              mt: 1,
              fontSize: { xs: '2.25rem', sm: '3rem' },
              lineHeight: 1.15,
            }}
          >
            {t.app_title}
          </Typography>
        </Box>

        <Typography
          variant="body1"
          textAlign="center"
          sx={{ color: 'text.secondary', maxWidth: 460 }}
        >
          {t.app_description}
        </Typography>

        <Button
          component={RouterLink}
          to="/test"
          variant="contained"
          size="large"
          sx={{ px: 5, py: 1.25, fontSize: '1rem' }}
          data-testid="start-test-button"
        >
          {t.home_cta_start}
        </Button>

        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {t.home_footnote}
        </Typography>
      </Stack>
    </Box>
    <Footer />
    </>
  );
}

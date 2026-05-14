import React, { ReactNode, useState } from 'react';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { Link as RouterLink } from 'react-router-dom';
import LanguageMenu from '../i18n/LanguageMenu';
import { useT } from '../i18n/useLangContext';
import ShareDialog from './ShareDialog';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const t = useT();
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        '@supports (min-height: 100dvh)': {
          minHeight: '100dvh',
        },
        bgcolor: 'background.default',
      }}
    >
      <AppBar
        position="sticky"
        color="default"
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              color: 'text.primary',
              textDecoration: 'none',
              fontWeight: 700,
              letterSpacing: '-0.01em',
            }}
          >
            {t.app_title}
          </Typography>
          <Tooltip title={t.share_button}>
            <IconButton
              onClick={() => setShareOpen(true)}
              aria-label={t.share_button}
              color="inherit"
              size="small"
              data-testid="header-share-button"
              sx={{ mr: 0.5 }}
            >
              <ShareIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <LanguageMenu />
        </Toolbar>
      </AppBar>
      <ShareDialog open={shareOpen} onClose={() => setShareOpen(false)} />
      <Container
        maxWidth="md"
        sx={{
          flex: 1,
          py: { xs: 3, sm: 5 },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Container>
    </Box>
  );
}

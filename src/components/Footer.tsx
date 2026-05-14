import { Box, Container, Divider, Link, Stack } from '@mui/material';
import React, { ReactNode } from 'react';
import { useT } from '../i18n/useLangContext';

function FooterLink({ children, href }: { href: string; children?: ReactNode }) {
  return (
    <Link href={href} target="_blank" underline="hover" rel="noopener">
      {children}
    </Link>
  );
}

export default function Footer() {
  const t = useT();
  return (
    <Container
      component="footer"
      sx={{
        mt: 8,
        fontSize: 12,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        sx={{ my: 2, justifyContent: 'center' }}
      >
        <Box><FooterLink href="https://www.predatorray.me">{t.footer_author}</FooterLink></Box>
        <Box><FooterLink href="https://github.com/predatorray/poker-bti">{t.footer_source}</FooterLink></Box>
      </Stack>
    </Container>
  );
}

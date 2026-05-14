import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useT } from '../i18n/useLangContext';
import { TYPE_IMAGES } from '../assets/typeImages';
import { ALL_TYPE_CODES, TypeCode } from '../bti/types';

const MIN_DURATION_MS = 1800;
const MESSAGE_INTERVAL_MS = 600;

function isValidTypeCode(code: string | undefined): code is TypeCode {
  return !!code && (ALL_TYPE_CODES as string[]).includes(code);
}

export default function LoadingPage() {
  const { typeCode } = useParams<{ typeCode: string }>();
  const t = useT();
  const navigate = useNavigate();
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = t.loading_messages;
  const totalMessages = messages.length;
  const messageDuration = Math.max(MIN_DURATION_MS / totalMessages, MESSAGE_INTERVAL_MS);

  useEffect(() => {
    if (!isValidTypeCode(typeCode)) {
      navigate('/', { replace: true });
      return;
    }

    const startedAt = Date.now();
    const imageSrc = TYPE_IMAGES[typeCode];

    const imageReady = new Promise<void>((resolve) => {
      if (!imageSrc) {
        resolve();
        return;
      }
      const img = new Image();
      img.src = imageSrc;
      if (img.complete) {
        resolve();
        return;
      }
      img.onload = () => resolve();
      img.onerror = () => resolve();
    });

    const minDelay = new Promise<void>((resolve) => {
      const elapsed = Date.now() - startedAt;
      window.setTimeout(resolve, Math.max(MIN_DURATION_MS - elapsed, 0));
    });

    let cancelled = false;
    Promise.all([imageReady, minDelay]).then(() => {
      if (!cancelled) navigate(`/result/${typeCode}`, { replace: true });
    });

    return () => {
      cancelled = true;
    };
  }, [typeCode, navigate]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setMessageIndex((i) => (i + 1) % totalMessages);
    }, messageDuration);
    return () => window.clearInterval(timer);
  }, [totalMessages, messageDuration]);

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 6, sm: 10 },
      }}
      data-testid="loading-page"
    >
      <Stack spacing={4} alignItems="center">
        <CircularProgress size={56} thickness={4} />
        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary',
            textAlign: 'center',
            minHeight: '2.5em',
            transition: 'opacity 0.3s',
          }}
          data-testid="loading-message"
          key={messageIndex}
        >
          {messages[messageIndex]}
        </Typography>
        <Stack direction="row" spacing={1.25}>
          {messages.map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: i <= messageIndex ? 'primary.main' : 'action.disabledBackground',
                transition: 'background-color 0.3s',
              }}
            />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}

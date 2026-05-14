import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import ShareIcon from '@mui/icons-material/Share';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useT } from '../i18n/useLangContext';
import { TYPE_IMAGES } from '../assets/typeImages';
import { ALL_TYPE_CODES, AXES, AXIS_POLES, TypeCode } from '../bti/types';
import ShareDialog from '../components/ShareDialog';
import Footer from '../components/Footer';

function isValidTypeCode(code: string | undefined): code is TypeCode {
  return !!code && (ALL_TYPE_CODES as string[]).includes(code);
}

interface PlaceholderProps {
  code: TypeCode;
}

function CardPlaceholder({ code }: PlaceholderProps) {
  return (
    <Box
      sx={{
        width: '100%',
        aspectRatio: '3 / 4',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        background:
          'linear-gradient(160deg, #0a6b3d 0%, #06532f 60%, #043b22 100%)',
        color: '#fff',
        boxShadow: 'inset 0 0 0 6px rgba(255,255,255,0.08)',
      }}
      data-testid="result-type-placeholder"
    >
      <Typography
        sx={{
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontWeight: 700,
          letterSpacing: '0.15em',
          fontSize: { xs: '2.4rem', sm: '3rem' },
        }}
      >
        {code}
      </Typography>
      <Box
        sx={{
          width: 40,
          height: 2,
          bgcolor: 'rgba(255,255,255,0.4)',
          borderRadius: 1,
        }}
      />
      <Typography
        sx={{
          fontSize: '0.85rem',
          opacity: 0.8,
          letterSpacing: '0.18em',
        }}
      >
        POKER · BTI
      </Typography>
    </Box>
  );
}

export default function ResultPage() {
  const { typeCode } = useParams<{ typeCode: string }>();
  const t = useT();
  const navigate = useNavigate();
  const [shareOpen, setShareOpen] = useState(false);

  if (!isValidTypeCode(typeCode)) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="h5" gutterBottom>
          Unknown type
        </Typography>
        <Button component={RouterLink} to="/" variant="contained">
          {t.result_retake}
        </Button>
      </Box>
    );
  }

  const typeInfo = t.types[typeCode as keyof typeof t.types];
  const image = TYPE_IMAGES[typeCode];

  const poles = typeCode.split('') as Array<typeof typeCode[number]>;

  const pageTitle = `${typeInfo.name} (${typeCode}) — ${t.app_title}`;
  const pageDescription = `${typeInfo.tagline} ${typeInfo.description}`;

  return (
    <Box sx={{ flex: 1 }} data-testid="result-page">
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <Stack
        spacing={{ xs: 3, sm: 5 }}
        sx={{ maxWidth: 760, mx: 'auto', width: '100%' }}
      >
        <Box textAlign="center">
          <Typography
            variant="overline"
            sx={{ color: 'text.secondary', letterSpacing: '0.18em' }}
          >
            {t.result_title}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              mt: 1,
              fontSize: { xs: '2rem', sm: '3rem' },
              color: 'primary.main',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              letterSpacing: '0.04em',
            }}
            data-testid="result-type-code"
          >
            {typeCode}
          </Typography>
          <Typography
            variant="h4"
            sx={{ mt: 1, fontSize: { xs: '1.4rem', sm: '1.75rem' } }}
            data-testid="result-type-name"
          >
            {typeInfo.name}
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 3, sm: 4 },
            p: { xs: 3, sm: 4 },
            border: '1px solid',
            borderColor: 'divider',
            alignItems: { xs: 'center', sm: 'flex-start' },
          }}
        >
          <Box
            sx={{
              flexShrink: 0,
              width: { xs: '70%', sm: 240 },
              maxWidth: 280,
            }}
          >
            {image ? (
              <Box
                component="img"
                src={image}
                alt={typeInfo.name}
                sx={{
                  width: '100%',
                  aspectRatio: '3 / 4',
                  objectFit: 'cover',
                  borderRadius: 2,
                  display: 'block',
                }}
                data-testid="result-type-image"
              />
            ) : (
              <CardPlaceholder code={typeCode} />
            )}
          </Box>
          <Stack spacing={2} sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{ fontStyle: 'italic', color: 'text.secondary' }}
            >
              "{typeInfo.tagline}"
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              {typeInfo.description}
            </Typography>
          </Stack>
        </Paper>

        <Box>
          <Typography
            variant="subtitle1"
            sx={{ mb: 1.5, fontWeight: 600 }}
          >
            {t.result_axes_heading}
          </Typography>
          <Stack spacing={1.5}>
            {AXES.map((axis, i) => {
              const pole = poles[i];
              const [first, second] = AXIS_POLES[axis];
              const tx = t as unknown as Record<string, string>;
              const axisLabel = tx[`axis_${axis}`];
              const axisTagline = tx[`axis_${axis}_tagline`];
              const poleLabel = tx[`pole_${pole}`];
              const poleDescription = tx[`pole_${pole}_description`];
              return (
                <Stack
                  key={axis}
                  spacing={1.25}
                  sx={{
                    p: { xs: 2, sm: 2.5 },
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                  }}
                  data-testid={`result-axis-${axis}`}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1.5}
                    sx={{ flexWrap: 'wrap', rowGap: 1 }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        minWidth: 28,
                      }}
                    >
                      {pole}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ flex: 1, color: 'text.secondary', fontWeight: 600 }}
                    >
                      {axisLabel}
                    </Typography>
                    <Chip
                      label={poleLabel}
                      size="small"
                      color={pole === first ? 'primary' : 'secondary'}
                      variant={pole === first ? 'filled' : 'outlined'}
                      sx={{ fontWeight: 600 }}
                    />
                    <Box
                      component="span"
                      sx={{ color: 'text.disabled', fontSize: '0.75rem' }}
                    >
                      {first} / {second}
                    </Box>
                  </Stack>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontStyle: 'italic',
                      pl: { xs: 0, sm: 5 },
                    }}
                  >
                    {axisTagline}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      lineHeight: 1.7,
                      pl: { xs: 0, sm: 5 },
                    }}
                  >
                    {poleDescription}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        </Box>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
          sx={{ pt: 2 }}
        >
          <Button
            onClick={() => navigate('/test')}
            variant="contained"
            startIcon={<ReplayIcon />}
            data-testid="result-retake-button"
          >
            {t.result_retake}
          </Button>
          <Button
            onClick={() => setShareOpen(true)}
            variant="outlined"
            color="inherit"
            startIcon={<ShareIcon />}
            data-testid="result-share-button"
          >
            {t.result_share}
          </Button>
        </Stack>
      </Stack>
      <ShareDialog
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        text={t.result_share_text(typeCode, typeInfo.name)}
      />
      <Footer />
    </Box>
  );
}

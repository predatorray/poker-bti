import React, { useMemo, useState } from 'react';
import {
  Box,
  Button,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { useT } from '../i18n/useLangContext';
import { QUESTIONS, NUM_QUESTIONS } from '../bti/questions';
import { Answers, scoreAnswers } from '../bti/scoring';

type QuestionId = keyof ReturnType<typeof useT>['questions'];

export default function WizardPage() {
  const t = useT();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const question = QUESTIONS[index];
  const qContent = t.questions[question.id as QuestionId];
  const selected = answers[question.id];
  const isLast = index === NUM_QUESTIONS - 1;

  const progress = useMemo(
    () => ((index + 1) / NUM_QUESTIONS) * 100,
    [index],
  );

  function handleSelect(choice: 0 | 1) {
    setAnswers((prev) => ({ ...prev, [question.id]: choice }));
  }

  function handlePrev() {
    if (index > 0) setIndex(index - 1);
  }

  function handleNext() {
    if (selected === undefined) return;
    if (isLast) {
      const code = scoreAnswers({ ...answers, [question.id]: selected });
      navigate(`/loading/${code}`);
    } else {
      setIndex(index + 1);
    }
  }

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <title>{`${t.home_cta_start} — ${t.app_title}`}</title>
      <meta name="description" content={t.app_description} />
      <Stack spacing={1} sx={{ mb: { xs: 3, sm: 4 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline">
          <Typography variant="body2" sx={{ color: 'text.secondary' }} data-testid="wizard-progress-text">
            {t.wizard_progress(index + 1, NUM_QUESTIONS)}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {t.wizard_pick_hint}
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 6, borderRadius: 999 }}
        />
      </Stack>

      <Paper
        elevation={0}
        sx={{
          flex: 1,
          p: { xs: 3, sm: 5 },
          border: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 3, sm: 4 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: '1.4rem', sm: '1.75rem' },
            lineHeight: 1.4,
          }}
          data-testid="wizard-question-text"
        >
          {qContent.question}
        </Typography>

        <Stack spacing={2}>
          {qContent.options.map((label, i) => {
            const isSelected = selected === (i as 0 | 1);
            return (
              <Button
                key={i}
                onClick={() => handleSelect(i as 0 | 1)}
                variant={isSelected ? 'contained' : 'outlined'}
                color={isSelected ? 'primary' : 'inherit'}
                fullWidth
                size="large"
                sx={{
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  py: 2,
                  px: 3,
                  borderRadius: 2,
                  borderColor: isSelected ? 'primary.main' : 'divider',
                  whiteSpace: 'normal',
                  lineHeight: 1.5,
                  '& .MuiButton-startIcon': { mr: 2 },
                }}
                data-testid={`wizard-option-${i}`}
              >
                {label}
              </Button>
            );
          })}
        </Stack>
      </Paper>

      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ mt: { xs: 3, sm: 4 } }}
      >
        <Button
          onClick={handlePrev}
          disabled={index === 0}
          startIcon={<ArrowBackIcon />}
          color="inherit"
          data-testid="wizard-prev-button"
        >
          {t.wizard_prev}
        </Button>
        <Button
          onClick={handleNext}
          disabled={selected === undefined}
          variant="contained"
          endIcon={!isLast ? <ArrowForwardIcon /> : undefined}
          data-testid="wizard-next-button"
        >
          {isLast ? t.wizard_finish : t.wizard_next}
        </Button>
      </Stack>
    </Box>
  );
}

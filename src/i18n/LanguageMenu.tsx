import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  ListItemText,
  Typography,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { SUPPORTED_LANGUAGES, SupportedLanguages } from './translations.type';
import { getTranslations } from './translations';
import useLangContext from './useLangContext';
import { setLanguagePreference } from './LocalLanguagePreference';

export default function LanguageMenu() {
  const { lang, setLang } = useLangContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        size="small"
        startIcon={<LanguageIcon fontSize="small" />}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        aria-label="Change language"
        aria-haspopup="menu"
        color="inherit"
        data-testid="language-menu-button"
      >
        {getTranslations(lang).lang}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        {SUPPORTED_LANGUAGES.map((code) => (
          <MenuItem
            key={code}
            selected={code === lang}
            onClick={() => {
              setLang(code as SupportedLanguages);
              setLanguagePreference(code);
              setAnchorEl(null);
            }}
            data-testid={`language-option-${code}`}
          >
            <ListItemText sx={{ mr: 2 }}>
              {getTranslations(code as SupportedLanguages).lang}
            </ListItemText>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {code}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

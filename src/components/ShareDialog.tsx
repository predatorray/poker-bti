import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import ShareIcon from '@mui/icons-material/Share';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import RedditIcon from '@mui/icons-material/Reddit';
import QRCode from 'react-qr-code';
import { useT } from '../i18n/useLangContext';

interface ShareDialogProps {
  open: boolean;
  onClose: () => void;
  /** Optional message to share alongside the URL (e.g. result text). */
  text?: string;
}

function getHomeUrl(): string {
  if (typeof window === 'undefined') return '';
  const base = process.env.PUBLIC_URL || '/';
  const trimmed = base.endsWith('/') ? base : `${base}/`;
  return window.location.origin + trimmed;
}

interface ShareTarget {
  name: string;
  color: string;
  Icon: React.ComponentType<{ fontSize?: 'small' | 'inherit' | 'medium' | 'large' }>;
  href: (url: string, text: string) => string;
}

const TARGETS: ShareTarget[] = [
  {
    name: 'X',
    color: '#000000',
    Icon: XIcon,
    href: (url, text) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
  },
  {
    name: 'Facebook',
    color: '#1877F2',
    Icon: FacebookIcon,
    href: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: 'WhatsApp',
    color: '#25D366',
    Icon: WhatsAppIcon,
    href: (url, text) =>
      `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
  },
  {
    name: 'Telegram',
    color: '#229ED9',
    Icon: TelegramIcon,
    href: (url, text) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  },
  {
    name: 'Reddit',
    color: '#FF4500',
    Icon: RedditIcon,
    href: (url, text) =>
      `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`,
  },
];

export default function ShareDialog({ open, onClose, text }: ShareDialogProps) {
  const t = useT();
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState('');
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    if (open) {
      setUrl(getHomeUrl());
      setCopied(false);
      setCanNativeShare(
        typeof navigator !== 'undefined' && typeof navigator.share === 'function',
      );
    }
  }, [open]);

  const shareText = text || t.share_default_text;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback: select the input — user can copy manually
      const input = document.getElementById(
        'share-dialog-link-input',
      ) as HTMLInputElement | null;
      if (input) {
        input.focus();
        input.select();
      }
    }
  }

  async function handleNativeShare() {
    try {
      await navigator.share({
        title: t.app_title,
        text: shareText,
        url,
      });
    } catch {
      // User cancelled or share failed — no-op.
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      data-testid="share-dialog"
    >
      <DialogTitle sx={{ pr: 6 }}>
        {t.share_title}
        <IconButton
          onClick={onClose}
          aria-label="close"
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ pt: 1 }}>
          <TextField
            id="share-dialog-link-input"
            value={url}
            label={t.share_link_label}
            fullWidth
            slotProps={{
              input: {
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title={copied ? t.share_copied : t.share_copy}>
                      <IconButton
                        onClick={handleCopy}
                        aria-label={t.share_copy}
                        data-testid="share-copy-button"
                        edge="end"
                      >
                        {copied ? (
                          <CheckIcon fontSize="small" color="success" />
                        ) : (
                          <ContentCopyIcon fontSize="small" />
                        )}
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              },
            }}
            data-testid="share-link-field"
            onFocus={(e) => e.target.select()}
          />

          <Box>
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', display: 'block', mb: 1 }}
            >
              {t.share_via}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              sx={{ flexWrap: 'wrap', rowGap: 1 }}
              data-testid="share-targets"
            >
              {TARGETS.map(({ name, color, Icon, href }) => (
                <Tooltip key={name} title={t.share_on(name)}>
                  <IconButton
                    component="a"
                    href={href(url, shareText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.share_on(name)}
                    data-testid={`share-target-${name.toLowerCase()}`}
                    sx={{
                      color: '#fff',
                      bgcolor: color,
                      '&:hover': { bgcolor: color, opacity: 0.85 },
                    }}
                  >
                    <Icon fontSize="small" />
                  </IconButton>
                </Tooltip>
              ))}
              {canNativeShare && (
                <Tooltip title={t.share_native}>
                  <IconButton
                    onClick={handleNativeShare}
                    aria-label={t.share_native}
                    data-testid="share-target-native"
                    sx={{
                      color: 'text.primary',
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <ShareIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {t.share_scan_hint}
            </Typography>
            <Box
              sx={{
                p: 2,
                bgcolor: '#fff',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
              }}
              data-testid="share-qrcode"
            >
              {url && (
                <QRCode
                  value={url}
                  size={180}
                  bgColor="#ffffff"
                  fgColor="#1a1a1a"
                />
              )}
            </Box>
          </Box>

          <Button onClick={onClose} fullWidth variant="text" color="inherit">
            {t.share_close}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

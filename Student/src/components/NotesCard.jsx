import * as React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';

export default function BasicCard({ subjectCode, subjectName, year, category, fileUrl }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Card
        elevation={4}
        sx={{
          minWidth: 275,
          maxWidth: 340,
          borderRadius: 4,
          mx: 'auto',
          bgcolor: '#fdfdfd',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          transition: 'transform 0.2s ease',
          '&:hover': {
            transform: 'scale(1.03)',
          },
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 1 }}>
            Year {year} • Category: <strong>{category}</strong>
          </Typography>

          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            {subjectName}
          </Typography>

          <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>
            Subject Code: {subjectCode}
          </Typography>

          <Typography variant="body2" sx={{ fontSize: 14 }}>
            These notes are provided to support students in their academic journey.
          </Typography>
        </CardContent>

        <CardActions sx={{ px: 2, pb: 2 }}>
          <Button
            component="a"
            href={fileUrl}
            download={`${subjectCode}.pdf`}
            size="small"
            variant="contained"
            color="primary"
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
          >
            Download Notes
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
}

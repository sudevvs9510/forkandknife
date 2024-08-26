import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  ThemeProvider, 
  createTheme 
} from '@mui/material';
import { FaCompass, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0d9488', 
    },
  },
});

const NotFoundPage: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f0f9ff', 
        }}
      >
        <Paper 
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 400,
          }}
        >
          <FaCompass size={60} color="#0d9488" />
          <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2, color: '#0d9488' }}>
            404 - Lost in Space
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Oops! It seems you've ventured into uncharted territory.
          </Typography>
          <Typography variant="body2" align="center" paragraph sx={{ mb: 3 }}>
            Don't worry, even the best explorers sometimes lose their way. Let's get you back on track!
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            startIcon={<FaHome />}
            fullWidth
            sx={{ 
              mt: 2,
              backgroundColor: '#0d9488',
              '&:hover': {
                backgroundColor: '#0f766e', 
              },
            }}
          >
            Return to Home Base
          </Button>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default NotFoundPage;
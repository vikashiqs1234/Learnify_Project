import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Collapse from '@mui/material/Collapse';
import Paper from '@mui/material/Paper';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Share Notes', to: '/share/notes' },
  { label: 'Community', to: '/community' },
  { label: 'Try AI', to: '/chatbot' },
  { label: 'Contact', to: 'https://vikash-six.vercel.app', external: true },
];

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isMenuOpened, setMenuOpened] = React.useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpened((prev) => !prev);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={4}
        sx={{
          background: 'linear-gradient(90deg, #0f2027, #203a43, #2c5364)',
          height: { xs: 70, md: 100 },
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: { xs: 2, md: 6 },
            height: '100%',
          }}
        >
          {/* Logo / Brand */}
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              color: '#fff',
              fontWeight: 'bold',
              textDecoration: 'none',
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: 2,
              transition: 'transform 0.3s ease',
              '&:hover': {
                color: '#ffd700',
                transform: 'scale(1.05)',
              },
            }}
          >
            Learnify
          </Typography>

          {/* Desktop Menu */}
          {!isMobile ? (
            <Box sx={{ display: 'flex', gap: 4 }}>
              {navItems.map(({ label, to, external }) => {
                const isActive = location.pathname === to;
                return (
                  <Button
                    key={label}
                    component={external ? 'a' : Link}
                    href={external ? to : undefined}
                    to={external ? undefined : to}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    sx={{
                      color: '#fff',
                      fontSize: '1.2rem',
                      textTransform: 'none',
                      position: 'relative',
                      fontWeight: 500,
                      '&:hover': { color: '#ffd700' },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: isActive ? '100%' : 0,
                        height: '2px',
                        bottom: 0,
                        left: 0,
                        backgroundColor: '#ffd700',
                        transition: 'width 0.3s ease',
                      },
                      '&:hover::after': { width: '100%' },
                    }}
                  >
                    {label}
                  </Button>
                );
              })}
            </Box>
          ) : (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleMenu}
              sx={{
                transition: 'transform 0.3s ease',
                '&:hover': {
                  color: '#ffd700',
                  transform: 'scale(1.2)',
                },
              }}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Menu Collapse */}
      {isMobile && (
        <Collapse in={isMenuOpened}>
          <Paper
            elevation={3}
            sx={{
              background: 'linear-gradient(90deg, #0f2027, #203a43, #2c5364)',
              px: 2,
              py: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {navItems.map(({ label, to, external }) => {
              const isActive = location.pathname === to;
              return (
                <Button
                  key={label}
                  component={external ? 'a' : Link}
                  href={external ? to : undefined}
                  to={external ? undefined : to}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  onClick={() => setMenuOpened(false)}
                  sx={{
                    justifyContent: 'flex-start',
                    color: isActive ? '#ffd700' : '#fff',
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '1rem',
                    '&:hover': {
                      color: '#ffd700',
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  {label}
                </Button>
              );
            })}
          </Paper>
        </Collapse>
      )}
    </>
  );
};

export default Navbar;

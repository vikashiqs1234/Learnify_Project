import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
  useTheme,
  Link as MuiLink,
  useMediaQuery,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Notes", to: "/notes" },
  { label: "Community", to: "/community" },
  { label: "Contact", to: "/contact" },
];

const socialLinks = [
  { icon: <GitHubIcon />, href: "https://github.com/" },
  { icon: <TwitterIcon />, href: "https://twitter.com/" },
  { icon: <LinkedInIcon />, href: "https://linkedin.com/" },
  { icon: <InstagramIcon />, href: "https://instagram.com/" },
];

const Footer = () => {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
        color: "#fff",
        pt: 8,
        pb: 4,
        borderTop: "2px solid #ffd700",
        fontFamily: "'Poppins', sans-serif",
        userSelect: "none",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Brand / About */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mb: 2,
                letterSpacing: 2,
                color: "#ffd700",
                textTransform: "uppercase",
                fontSize: { xs: "1.3rem", md: "1.5rem" },
                transition: "color 0.3s ease",
                "&:hover": {
                  color: "#fff",
                },
              }}
            >
              Learnify
            </Typography>
            <Typography
              variant="body2"
              sx={{
                maxWidth: 320,
                lineHeight: 1.6,
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: { xs: "0.9rem", md: "1rem" },
              }}
            >
              A place to find helpful study notes, solve doubts, and grow
              together as a student community.
            </Typography>
          </Grid>

          {/* Navigation */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mb: 2,
                letterSpacing: 1.5,
                color: "#ffd700",
                textTransform: "uppercase",
                fontSize: { xs: "1.3rem", md: "1.5rem" },
              }}
            >
              Quick Links
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              {navLinks.map(({ label, to }) => (
                <MuiLink
                  key={label}
                  component={Link}
                  to={to}
                  underline="none"
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    transition: "color 0.3s ease, transform 0.3s ease",
                    "&:hover": {
                      color: "#ffd700",
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  {label}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          {/* Socials */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mb: 2,
                letterSpacing: 1.5,
                color: "#ffd700",
                textTransform: "uppercase",
                fontSize: { xs: "1.3rem", md: "1.5rem" },
              }}
            >
              Connect with Us
            </Typography>
            <Box>
              {socialLinks.map(({ icon, href }, idx) => (
                <IconButton
                  key={idx}
                  component="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    transition: "color 0.3s ease, transform 0.3s ease",
                    mx: 0.5,
                    "&:hover": {
                      color: "#ffd700",
                      transform: "scale(1.2) rotate(10deg)",
                    },
                    fontSize: isSmDown ? "1.8rem" : "2.2rem",
                  }}
                  aria-label={`Link to ${href}`}
                >
                  {icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Divider & Bottom Text */}
        <Divider
          sx={{
            mt: 6,
            mb: 3,
            borderColor: "rgba(255, 215, 0, 0.5)",
            opacity: 0.6,
          }}
        />
        <Typography
          variant="body2"
          align="center"
          sx={{
            color: "rgba(255, 255, 255, 0.6)",
            fontSize: { xs: "0.85rem", md: "0.95rem" },
            letterSpacing: 0.5,
            userSelect: "none",
          }}
        >
          © {new Date().getFullYear()} Learnify. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

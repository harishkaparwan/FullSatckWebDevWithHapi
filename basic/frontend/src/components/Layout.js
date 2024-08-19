
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, CssBaseline, Container, IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet, Link } from 'react-router-dom';

function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      {/* Fixed Header */}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MUI Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* This Toolbar component is used to push the content below the fixed header */}
      
      {/* Drawer (Sidebar) */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem button component={Link} to="/">
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/about">
              <ListItemText primary="About" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard">
              <ListItemText primary="Dashboard" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Container component="main" sx={{ flexGrow: 1, mt: 2, mb: 2 }}>
        <Outlet />
      </Container>

      {/* Fixed Footer */}
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.grey[200],
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2024 MUI Dashboard. All Rights Reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default Layout;
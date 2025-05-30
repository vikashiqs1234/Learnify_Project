import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import Chatbot from '@mui/icons-material/SmartToy';
import ShareFiles from '@mui/icons-material/CloudUpload';
import Community from '@mui/icons-material/People';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { Link } from 'react-router-dom';

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250,paddingTop:'40px',color:'white',height:'100%',background:'black' }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {[
          { text: 'Home', icon: <HomeIcon sx={{color:'white'} } />,route:'/' },
          { text: 'Chatbot', icon: <Chatbot sx={{color:'white'} } />,route:'/chatbot' },
          { text: 'Share Files', icon: <ShareFiles sx={{color:'white'} } />,route:'/share/notes' },
          { text: 'Community', icon: <Community sx={{color:'white'} } />,route:'/community' },
          { text: 'Contact', icon: <ContactSupportIcon sx={{color:'white'} } />,route:'https://vikash-six.vercel.app' }
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <Link to={item.route}>
              <ListItemText sx={{color:'white'}} primary={item.text} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon sx={{ fontSize: '30px', color: 'white' }} />
      </Button>
      <Drawer  open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
}



import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import {ListItemButton} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Construction from './../../../assets/construction.png';
import StarBorder from '@mui/icons-material/StarBorder';
import {useState} from 'react';

const drawerWidth = 300;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

interface Menu {
  [key : string]: string[]
}


export default function ResponsiveDrawer(props: Props) {
  const {window} = props;
  const [mobileOpen, setMobileOpen] = useState(false);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menu : Menu = {
    '顧客情報登録': ['新規登録', '再編集', '顧客管理'],
    '顧客管理': ['資金計画作成', '見積書作成', '見込み管理'],
    '契約申請': ['新規登録', '再編集', '契約確認（検索）', '申請申請取り上げ']
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['顧客情報登録', '顧客管理', '契約申請'].map((text, index) => {
          const subMenu : string[] = menu[text];
          return (
            <div key={text}>
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>

              {subMenu.map((subText: string)=>{
                return (
                  <List key={subText + text} component="div" disablePadding>
                    <ListItemButton sx={{pl: 4}}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary={subText} />
                    </ListItemButton>
                  </List>
                );
              })}

            </div>);
        })}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: {xs: 'block', sm: 'none'},
            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: {xs: 'none', sm: 'block'},
            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}}}
      >
        <img src={Construction} alt="construction" />
      </Box>
    </Box>
  );
}

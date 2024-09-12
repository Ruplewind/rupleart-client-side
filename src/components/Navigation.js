import { Tab, Tabs, Box, Typography } from '@mui/material';
import { useState } from 'react';
import Hoodies from './Hoodies';
import Tshirts from './Tshirts';
import Videos from './Videos';

const Navigation = () => {
    const currentYear = new Date().getFullYear();

    const [currentTabIndex, setCurrentTabIndex] = useState(0);
 
    const handleTabChange = (e, tabIndex) => {
        //console.log(tabIndex);
        setCurrentTabIndex(tabIndex);
    };

    return ( <div className="min-h-screen">
        
        <div className='flex justify-center mt-5 text-gray-800 text-bold'>
            <Tabs value={currentTabIndex} onChange={handleTabChange}>
                <Tab label="T-shirts" />
                <Tab label="Hoodies" />
                <Tab label="Videos" />
            </Tabs>
        </div>
        {currentTabIndex === 0 && (
        <Box sx={{ p: 0 }} className="mt-3">
          <Typography>
                    <Tshirts />
          </Typography>
        </Box>
        )}

        {currentTabIndex === 1 && (
        <Box sx={{ p: 0 }} className="mt-3">
          <Typography>
                    <Hoodies />
          </Typography>
        </Box>
        )}

        {currentTabIndex === 2 && (
        <Box sx={{ p: 0 }} className="mt-3">
          <Typography>
                    <Videos />
          </Typography>
        </Box>
        )}

        <div className="fixed bottom-0 text-center p-5 text-sm">
            © {currentYear} Copyright Iko Nini
        </div>
    </div> );
}
 
export default Navigation;
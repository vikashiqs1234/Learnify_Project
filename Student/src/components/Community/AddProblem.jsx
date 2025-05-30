import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import Problem from './Problem'
import { useTheme } from '@mui/material/styles';

const AddProblem = ({change,setChange}) => {
    const [showProblem,setShowProblem] = useState(false);
    const theme = useTheme()
    const md = theme.breakpoints.down('md');
    const small = theme.breakpoints.down('sm')
  return (
    <Box sx={{textAlign:'end',mb:2}}>
        <Button color='error' onClick={()=>setShowProblem(!showProblem)} variant='contained' sx={{textTransform:'none',fontSize:'1.1rem',[small]:{fontSize:'1rem'}}}>Ask Question</Button>
        {
            showProblem?<Problem setShowProblem={setShowProblem} change={change} setChange={setChange}/>:''
        }
    </Box>
  )
}

export default AddProblem
import { Box, CircularProgress } from '@mui/material'
import {Container} from '@mui/material'
import React from 'react'

const Loader = () => {
  return (
    <Container  sx={{display:'flex',alignItems:'center',justifyContent:'center',zIndex:9090}} >
        <CircularProgress />
    </Container>
  )
}

export default Loader
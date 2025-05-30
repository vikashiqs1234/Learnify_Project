import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import {  addProblem } from '../Api'
import Swal from 'sweetalert2';

const Problem = ({change,setChange,setShowProblem}) => {
    
    const [formData,setFormData] = useState({});
    const handleAnswer = async(e)=>{
        e.preventDefault()
        const res = await addProblem(formData);
        console.log(res)
        if(res.success){
            Swal.fire({
                icon:'success',
                title:res.message,
            })
        }
        setChange(!change)
        setShowProblem(false)
    }
    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
  return (
    <Box sx={{mb:2}}>
         <Box 
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }} 
            component='form'
            onSubmit={handleAnswer}
            >
                <TextField
                variant='outlined'
                label='name'
                name='name'
                onChange={handleChange}
                InputProps={{
                    style: { fontSize: '1.3rem' },
                  }}
                />
             <TextField
                id="outlined-basic"
                label="enter problem here"
                variant="outlined"
                name='problem'
                onChange={handleChange}
                multiline
                rows={5}
                InputProps={{
                    style: { fontSize: '1.3rem' },
                  }}
                 />
             <Button type="submit" variant="contained" color="primary">Submit</Button>
            </Box>
    </Box>
  )
}

export default Problem
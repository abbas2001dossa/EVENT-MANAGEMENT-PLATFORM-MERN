import Alert from '@mui/material/Alert';
import React from 'react'

const AlertMessage =(props)=> {

    const message = props.message;
    const severityM = props.severity;

  return (
    <div>
      <Alert severity={severityM}> {message} </Alert>
    </div>
  )
}

export default AlertMessage

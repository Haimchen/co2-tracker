import React from 'react'
import { AppBar, Typography } from '@material-ui/core'

const HeaderBar = () => {
    return(
        <div>
        <AppBar position="static" className="HeaderBar-container">
            <Typography variant="h1">
            CO<sub>2</sub> Tracker
            </Typography>
            <Typography variant="subtitle1" gutterBottom>Learn how much Carbon emissions you cause</Typography>
        </AppBar>
        </div>
    )
}

export default HeaderBar;
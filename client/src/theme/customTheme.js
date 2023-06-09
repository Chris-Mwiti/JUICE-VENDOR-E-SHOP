import {createTheme} from '@mui/material/styles'

export const theme = createTheme(({
    palette:{
        primary: {
            main: '#ff991e',
            light: '#ffa942',
            contrastText: "#ffffff"
        },

        secondary:{
            main: '#faefd9',
            contrastText: '#000000'
        }


    },

    typography:{
        h3:{
            fontFamily:['Yusei Magic', 'sans-serif',].join(','),
            color: "#ffffff",
        },

        body1:{
            fontFamily: ['Lato', 'sans-serif',].join(','),
            color: '#8f8f8e',
        }

    }


}))
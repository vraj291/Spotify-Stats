import React,{useState} from 'react'
import { AddtoPlaylist } from '../../../spotify/playlists'
import { makeStyles } from '@material-ui/core/styles';
import {AddCircleOutlined} from '@material-ui/icons'
import CloseIcon from '@material-ui/icons/Close';
import { Switch,FormGroup,FormControlLabel,Typography,TextField,Button,IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const IOSSwitch = withStyles((theme) => ({
    root: {
      width: 43,
      height: 27,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: 'black',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: 'black',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      margin: 0.7,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      backgroundColor: '#989898',
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });

export const AddPlaylistCard = ({data,notify,handleTogglePlaylist}) => {

    const [playlist_name,setPlaylist_name] = useState('New Playlist')
    const [playlist_desc,setPlaylist_desc] = useState('')
    const [playlist_public,setPlaylist_public] = useState(false)

    const useStyles = makeStyles({
        root: {
            fontFamily : "'Titillium Web', sans-serif"
        },
        close:{
            position: 'absolute',
            top: '3%',
            right: '3%'
        }
        // },
        // butt:{
        //     position: 'absolute',
        //     bottom : '2rem'
        // }
    });

    const classes = useStyles();

    return(
        <div className='create-playlist-input'>
            <Typography variant='h4' className={classes.root}>Details</Typography>
            <IconButton className={classes.close} onClick={handleTogglePlaylist}>
                <CloseIcon fontSize='large'/>
            </IconButton>
            <div className='create-playlist-input-text'>    
                <TextField 
                    InputLabelProps={{className : classes.root}}
                    label="Name" 
                    variant="filled" 
                    value={playlist_name}
                    fullWidth
                    onChange={(e) => setPlaylist_name(e.target.value)}
                />
                <TextField
                    InputLabelProps={{className : classes.root}}  
                    multiline
                    label="Description" 
                    variant="filled" 
                    value={playlist_desc}
                    rows={5}
                    fullWidth
                    onChange={(e) => setPlaylist_desc(e.target.value)}
                />
                <FormControlLabel
                    control={
                        <IOSSwitch 
                            checked={playlist_public} 
                            onChange={(e) => setPlaylist_public(e.target.checked)} 
                            name="checkedB" 
                        />
                    }
                    label="Public"
                    labelPlacement="start"
                />
            </div>
            <Button
                variant="contained"
                className={classes.butt}
                startIcon={<AddCircleOutlined />}
                onClick={() => {
                    AddtoPlaylist({
                        "name": playlist_name,
                        "description": playlist_desc,
                        "public": playlist_public
                    },data).then(({error,url}) => {
                      handleTogglePlaylist()
                      if(error || url === null){
                        setTimeout(notify(true,url),500)
                      }else{
                        setTimeout(notify(false,url),500)
                      }
                    })
                 }}
            >
                <Typography className={classes.root}>Create Playlist</Typography>
            </Button>
        </div>
    )
}
import React, {useState} from 'react';
import ReactPlayer from 'react-player';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DehazeIcon from '@material-ui/icons/Dehaze';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './App.css';

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: '10px',
  },
  list: {
    padding: 5,
    maxHeight: '500px',
    overflowY: 'scroll',
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    textAlign: 'center',
    margin: theme.spacing(4, 0, 2),
  },
  item: {
    marginTop: '30px',
  },
  avatar: {
    cursor: 'pointer',
  },
  selected: {
    backgroundColor: 'red',
  },
}));

const LIST = [
  {
    url: 'https://www.youtube.com/watch?v=Fkd9TWUtFm0',
    hover: false,
  },
  {
    url: 'https://www.youtube.com/watch?v=Rx8pfheh6aI',
    hover: false,
  },
  {
    url: 'https://www.youtube.com/watch?v=RSqy0jsGdoY',
    hover: false,
  },
  {
    url: 'https://www.youtube.com/watch?v=mA8pNpPvrr0',
    hover: false,
  },
  {
    url: 'https://www.youtube.com/watch?v=k7EqoT5YOqk',
    hover: false,
  },
  {
    url: 'https://www.youtube.com/watch?v=E9oKEJ1pXPw',
    hover: false,
  },
  {
    url: 'https://www.youtube.com/watch?v=n3kNlFMXslo',
    hover: false,
  },
];

function App() {
  const [list, setList] = useState(LIST);
  const [selected, setSelected] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');

  const classes = useStyles();
  const videoUrl = list.length
    ? list[selected].url
    : 'https://www.youtube.com/watch?v=fySaWH6qIVg';

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = url => {
    const updatedList = [{url, hover: false}, ...list];
    setList(updatedList);
  };

  const validateUrl = url => {
    const regExp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    const match = url.match(regExp);
    if (url !== '' && match) {
      return match[1];
    }
    return false;
  };

  return (
    <div className="App">
      <header className="App-header">Video Player</header>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8} className={classes.item}>
          <ReactPlayer
            url={videoUrl}
            playing
            controls
            muted
            style={{
              margin: '0 auto',
            }}
            width="80%"
            height="500px"
            onDuration={duration => {
              console.log(duration);
            }}
            onEnded={() => {
              const updatedList = list.filter(list => list.url !== videoUrl);
              setList(updatedList);
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h6" className={classes.title}>
            Playlist
          </Typography>

          <div>
            <List className={classes.list}>
              {list.map((item, index) => {
                return (
                  <ListItem
                    onDragEnter={() => console.log('drag enter')}
                    onDragOver={() => console.log('onDragOver')}
                    onDrop={() => console.log('drop')}
                    style={{
                      border: '1px solid',
                    }}
                    onMouseEnter={() => {
                      setHoverIndex(index);
                    }}
                    onClick={() => {
                      setSelected(index);
                    }}>
                    <ListItemAvatar
                      draggable
                      className={classes.avatar}
                      onClick={() => {
                        console.log('Reorder');
                      }}>
                      <Avatar>
                        <DehazeIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.url} />
                    <ListItemSecondaryAction>
                      {hoverIndex === index ? (
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => {
                            const updatedList = list.filter(
                              (_, i) => i !== index,
                            );
                            setList(updatedList);
                          }}>
                          <DeleteIcon />
                        </IconButton>
                      ) : null}
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleClickOpen}>
              Add New
            </Button>

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add New Video</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please paste the youtube url of your choice
                </DialogContentText>
                <TextField
                  autoFocus
                  error={!validateUrl(url)}
                  margin="dense"
                  id="url"
                  label="URL"
                  fullWidth
                  onChange={e => {
                    const {value} = e.target;
                    setUrl(value);
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button
                  disabled={!validateUrl(url)}
                  onClick={() => {
                    handleAdd(url);
                    setOpen(false);
                  }}
                  color="primary">
                  Add
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

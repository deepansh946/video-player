import React, {useState} from 'react';
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

import {LIST} from './constants';
import VideoPlayer from './components/VideoPlayer';
import DialogBox from './components/DialogBox';

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

function App() {
  const [list, setList] = useState(LIST);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [endIndex, setEndIndex] = useState(-1);

  const classes = useStyles();
  const videoUrl = list.length
    ? list[selected].url
    : 'https://www.youtube.com/watch?v=fySaWH6qIVg';

  const onDrop = e => {
    const idx = e.dataTransfer.getData('text');
    console.log('Dropped at', endIndex, ' from ', idx);
    let tempList = list;
    const tempValue = tempList[endIndex];
    tempList[endIndex] = tempList[idx];
    tempList[idx] = tempValue;
    setList([...tempList]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          <VideoPlayer
            data={list}
            url={videoUrl}
            onComplete={list => setList(list)}
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
                    draggable
                    onDragStart={e => {
                      e.dataTransfer.setData('text/plain', index);
                    }}
                    onDragOver={e => {
                      e.preventDefault();
                      setEndIndex(index);
                    }}
                    onDrop={e => {
                      onDrop(e);
                    }}
                    style={{
                      border: '1px solid',
                    }}
                    onMouseEnter={() => {
                      setHoverIndex(index);
                    }}
                    onClick={() => {
                      setSelected(index);
                    }}>
                    <ListItemAvatar className={classes.avatar}>
                      <Avatar>
                        <DehazeIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.id + '  ' + item.url} />
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
            <DialogBox
              open={open}
              setOpen={setOpen}
              data={list}
              onUpdateList={list => setList(list)}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

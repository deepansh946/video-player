import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {LIST} from './constants';
import VideoPlayer from './components/VideoPlayer';
import DialogBox from './components/DialogBox';
import VideosList from './components/VideosList';

import './App.css';

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: '20px',
  },
  title: {
    textAlign: 'center',
    margin: theme.spacing(4, 0, 2),
  },
  item: {
    marginTop: '30px',
  },
}));

function App() {
  let localStorageList = localStorage.getItem('list');

  if (localStorageList === null) {
    localStorageList = LIST;
  } else if (typeof localStorageList === 'string') {
    localStorageList = localStorageList.split(',');
  }

  const [list, setList] = useState(localStorageList);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const classes = useStyles();

  const videoUrl = list.length
    ? list[selected]
    : 'https://www.youtube.com/watch?v=fySaWH6qIVg';

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    window.addEventListener(
      'storage',
      storage => {
        const list = localStorage.getItem('list');
        if (list === null) {
          setList(LIST);
        } else {
          setList(list.split(','));
        }
      },
      false,
    );
  }, []);

  useEffect(() => {
    console.log(list);
    localStorage.setItem('list', list);
    window.dispatchEvent(new Event('storage'));
    setList(list);
  }, [list]);

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
            <VideosList
              data={list}
              onListUpdate={list => setList(list)}
              setSelected={setSelected}
            />
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

import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {YOUTUBE_REGEX} from '../constants';

function DialogBox({open, data, onUpdateList, setOpen}) {
  const [url, setUrl] = useState('');

  const handleAdd = url => {
    const updatedList = [url, ...data];
    onUpdateList(updatedList);
    setUrl('');
  };

  const validateUrl = url => {
    const match = url.match(YOUTUBE_REGEX);
    if (url !== '' && match) {
      return match[1];
    }
    return false;
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
    </>
  );
}

export default DialogBox;

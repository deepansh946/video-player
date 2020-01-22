import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function DialogBox({open, data, onUpdateList, setOpen}) {
  const [url, setUrl] = useState('');

  const handleAdd = url => {
    const updatedList = [{id: data.length + 1, url, hover: false}, ...data];
    onUpdateList(updatedList);
  };

  const validateUrl = url => {
    const regExp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    const match = url.match(regExp);
    if (url !== '' && match) {
      return match[1];
    }
    return false;
  };

  const handleClickOpen = () => {
    setOpen(true);
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

import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DehazeIcon from '@material-ui/icons/Dehaze';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  list: {
    padding: 5,
    maxHeight: '600px',
    overflowY: 'scroll',
  },
  listItem: {
    border: '1px solid',
    margin: '5px 0px',
    borderRadius: '10px',
  },
  listItemText: {
    cursor: 'pointer',
    wordBreak: 'break-word',
  },
  avatar: {
    cursor: 'pointer',
  },
}));

function VideosList({data, onListUpdate, setSelected}) {
  const [hoverIndex, setHoverIndex] = useState(null);
  const classes = useStyles();

  const onDrop = (e, endIndex) => {
    const idx = e.dataTransfer.getData('text');
    let tempList = data;
    const tempValue = tempList[endIndex];
    tempList[endIndex] = tempList[idx];
    tempList[idx] = tempValue;
    onListUpdate([...tempList]);
  };

  return (
    <List className={classes.list}>
      {data.map((item, index) => {
        return (
          <ListItem
            className={classes.listItem}
            key={index}
            draggable
            onDragStart={e => {
              e.dataTransfer.setData('text/plain', index);
            }}
            onDragOver={e => {
              e.preventDefault();
              return false;
            }}
            onDrop={e => {
              onDrop(e, index);
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
            <ListItemText
              className={classes.listItemText}
              primary={index + '  ' + item}
            />
            <ListItemSecondaryAction>
              {hoverIndex === index ? (
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    const updatedList = data.filter((_, i) => i !== index);
                    onListUpdate(updatedList);
                  }}>
                  <DeleteIcon />
                </IconButton>
              ) : null}
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}

export default VideosList;

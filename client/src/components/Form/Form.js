import { Button, Paper, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { successNF } from '../../redux/actions/notificationsAction';
import { createPost, updatePost } from '../../redux/actions/posts';
import useStyles from './styles';


const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ name: '', position: '', sealery: '', selectedFile: {} });

  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ name: '', position: '', sealery: '', selectedFile: {} });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      dispatch(createPost(postData));
      dispatch(successNF('Add Employee request sended to server'));
      clear();
    } else {
      dispatch(updatePost(currentId, postData));
      dispatch(successNF(`updating ${postData.name} Profile`));
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography 
          variant="h6">
            {currentId ? `Editing "${post.name}" Profile` : 'Creating a Employee'}
        </Typography>
        
        <TextField 
          name="name" 
          variant="outlined" 
          label="name" 
          fullWidth 
          value={postData.name} 
          onChange={(e) => setPostData({ ...postData, name: e.target.value })} 
          />
        
        <TextField 
          name="position" 
          variant="outlined" 
          label="position" 
          fullWidth 
          value={postData.position} 
          onChange={(e) => setPostData({ ...postData, position: e.target.value })} 
          />
        
        <TextField 
          name="sealery" 
          variant="outlined" 
          label="sealery" 
          fullWidth 
          value={postData.sealery} 
          onChange={(e) => setPostData({ ...postData, sealery: e.target.value })} 
          />
        
        <div className={classes.fileInput}>
          <span>employee Profile Picture</span>
          <FileBase 
            type="file" 
            multiple={false} 
            onDone={({ base64 }) => 
            setPostData({ ...postData, employeeProfile: base64 })} 
          />
          </div>
        

        <Button 
          className={classes.buttonSubmit} 
          variant="contained" 
          color="primary" 
          size="large" 
          type="submit" 
          fullWidth
        >
          Submit
        </Button>
        
        <Button 
          variant="contained" 
          color="secondary" size="small" 
          onClick={clear} 
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;

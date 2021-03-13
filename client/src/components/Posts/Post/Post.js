import { Button, CardActions } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../redux/actions/posts';
import './Post.css';
import useStyles from './styles';


const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const {_id,employeeProfile,position,selectedFile}=post;

  return (
      <div className='cinemaCard'>
        <div className='cinemaCardInfo'>
            <img src={employeeProfile} alt="" />
            <h2>Name: {post.name}</h2>
            <h4>Id: {_id}</h4>
            <h4>Position: {position}</h4>
            <h4>PDF File: {selectedFile ? selectedFile.name : 'not uploaded'}</h4>
        </div>
        <CardActions className={classes.cardActions}>
          <Button 
            size="small" 
            color="primary" 
            onClick={() => setCurrentId(post._id)}
          >
            <EditIcon fontSize="small" />
            Edit
          </Button>
          <Button 
            size="small" 
            color="primary" 
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        </CardActions>
      </div>
  );
};

export default Post;

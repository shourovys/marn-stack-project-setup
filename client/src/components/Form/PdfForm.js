import { Button, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { errorNF, successNF } from '../../redux/actions/notificationsAction';
import { updatePDF } from '../../redux/actions/posts';
import useStyles from './styles';


const PdfForm = ({currentId,setCurrentId}) => {
    const [selectedFile, setSelectedFile] = useState({})
    
    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();

    const fileInput =useRef()

    useEffect(() => {
        if (post) setSelectedFile(post.selectedFile);
    }, [post]);

    const fileFormatter=()=>{
        return {
            name:selectedFile.name,
            size:selectedFile.size,
            lastModified:selectedFile.lastModified,
            type:selectedFile.type
        }
    }

    const clear = () => {
        setCurrentId(0);
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId === 0 ) {
            if (selectedFile.name) {
                dispatch(updatePDF(selectedFile.name,fileFormatter()));
                dispatch(successNF('Your PDF file sended to Server'));
            }else{
                dispatch(errorNF('Please add a pdf file with the name of _ID'));
            }
        } else {
            if (selectedFile.name) {
                dispatch(updatePDF(currentId, fileFormatter()));  
                clear()  
            }
        }
    };

    return (
        <Paper className={classes.paper}>
            <Typography 
                variant="h6"
            >
                {currentId ? `Editing "${post.name}" PDF` : 'Add PDF with name of employee id'}
            </Typography>

            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <div className={classes.fileInput}>
                    <input 
                        type="file" 
                        ref={fileInput}
                        accept=".pdf" 
                        onChange={(e) => setSelectedFile(fileInput.current.files[0] )}
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
            </form>
        </Paper>
    );
};

export default PdfForm;
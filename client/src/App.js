import { Container, Grid, Grow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useDispatch } from 'react-redux';
import Form from './components/Form/Form';
import PdfForm from './components/Form/PdfForm';
import Posts from './components/Posts/Posts';
import { getPosts } from './redux/actions/posts';
import './scss/style.css';

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              <PdfForm currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
      <NotificationContainer/>
    </Container>
  );
};

export default App;

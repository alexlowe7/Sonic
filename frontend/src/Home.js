import './index.css';
import React from 'react';
import { Container, Typography, Box, Card, CardContent, Button, Grid, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

const Home = () => {
    return (
        <Container maxWidth="md">
            <Box sx={{ my: 2 }}>
                <Typography className='text-center test-font' variant='h4' gutterBottom>
                    Welcome
                </Typography>
                {/* <Typography gutterBottom className='px-4 test-font'>
                    Discover the power of ear training with Sonic Ear Training App, designed to enhance your musical skills in Chord Identification and Interval Identification. Unlock your potential and become a well-rounded musician.
                </Typography> */}
                <Alert severity="info" icon={false}>
                    <h6 className='test-font mb-0'>
                        Welcome to the Sonic Ear Training App, designed to make you a better musician.
                        <br/><br/>
                        Check out our games below, and sign up to track your progress and unlock bonus features.
                    </h6>
                </Alert>   
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Card variant='outlined'>
                            <CardContent>
                                <Typography variant="h5" component="h2" className='mb-2 test-font'>
                                    {/* <PianoIcon fontSize="large" /> */}
                                    Chord Identification
                                </Typography>
                                <Typography variant="body1 test-font">
                                    Master chord recognition with this game. Develop the ability to identify many different chord types, from basic Minor and Major triads to advanced Jazz Chords.
                                </Typography>
                                <Row className='mt-3'>
                                    <Link to="/chords">
                                        <Button variant="contained" className='link-button test-font'>
                                            Start Chord Training
                                        </Button>
                                    </Link>
                                </Row>
                                
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card variant='outlined'>
                            <CardContent>
                                <Typography variant="h5" component="h2" className='mb-2 test-font'>
                                    {/* <MusicNoteIcon fontSize="large" /> */}
                                    Interval Identification
                                </Typography>
                                <Typography variant="body1 test-font">
                                    Sharpen your ears with Interval Identification. Learn to recognize the distance between notes, enhancing your ability to identify melodies to learn songs by ear faster
                                </Typography>
                                <Row className='mt-3'>
                                    <Link to="/notes">
                                        <Button variant="contained" className='link-button test-font '>
                                            Start Interval Training
                                        </Button>
                                    </Link>
                                </Row>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Home;

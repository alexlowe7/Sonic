import './index.css';
import React from 'react';
import { Container, Typography, Box, Card, CardContent, CardActions, Button, Grid, Stack, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PianoIcon from '@mui/icons-material/Piano';
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
                    <h6 className='test-font'>
                        Welcome to the Sonic Ear Training App, designed to make you a better musician.
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
                                    Master chord recognition with our innovative exercises. Develop the ability to identify major, minor, diminished, and augmented chords, boosting your skills in playing by ear, improvisation, and transcription. Evolve as a versatile musician and conquer any chord progression.
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
                                    Sharpen your ears with Interval Identification. Learn to recognize the distance between notes, enhancing your ability to identify melodies, harmonies, and musical structures. Boost your improvisation skills and learn songs by ear faster.
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

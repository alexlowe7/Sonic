import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ChordStatsTable = ({ stats }) => {
    const chordNames = Object.keys(stats);

    return (
        <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto' }}>
            <Table sx={{ minWidth: 300, textAlign: 'center' }} aria-label="chord stats table">
                <TableHead>
                    <TableRow>
                        <TableCell>Chord</TableCell>
                        <TableCell align="center">Correct</TableCell>
                        <TableCell align="center">Incorrect</TableCell>
                        <TableCell align="center">Accuracy</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {chordNames.map((chord) => (
                        <TableRow key={chord}>
                            <TableCell component="th" scope="row">
                                {chord}
                            </TableCell>
                            <TableCell align="center">
                                {stats[chord].correct}
                            </TableCell>
                            <TableCell align="center">
                                {stats[chord].incorrect}
                            </TableCell>
                            <TableCell align="center">
                                {stats[chord].correct + stats[chord].incorrect !== 0 ? 
                                    `${((stats[chord].correct / (stats[chord].correct + stats[chord].incorrect)) * 100).toFixed(0)}%` 
                                    : "0%"}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ChordStatsTable;

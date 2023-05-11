import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const StatsTable = ({ stats }) => {
    const intervalNames = Object.keys(stats);
  
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="stats table">
          <TableHead>
            <TableRow>
              <TableCell>Interval</TableCell>
              <TableCell align="center">Ascending</TableCell>
              <TableCell align="center">Descending</TableCell>
              <TableCell align="center">Harmonic</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {intervalNames.map((interval) => (
              <TableRow key={interval}>
                <TableCell component="th" scope="row">
                  {interval}
                </TableCell>
                {Object.keys(stats[interval]).map((type) => (
                  <TableCell key={type} align="center">
                    {`Correct: ${stats[interval][type].correct}, Incorrect: ${stats[interval][type].incorrect}`}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  

export default StatsTable;
  
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const IntervalStatsTable = ({ stats }) => {
    const intervalNames = Object.keys(stats);
  
    return (
      <TableContainer component={Paper} sx={{ width: '60%', margin: 'auto' }}>
        <Table sx={{ minWidth: 300, textAlign: 'center' }} aria-label="stats table">
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
                    {
                      `${stats[interval][type].correct}/${stats[interval][type].correct + stats[interval][type].incorrect}`
                    }
                    <br></br>
                    {(stats[interval][type].correct + stats[interval][type].incorrect !== 0) &&
                      `${
                        ((stats[interval][type].correct / 
                        (stats[interval][type].correct + stats[interval][type].incorrect)) * 100).toFixed(0)
                      }%`

                    }

                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  

export default IntervalStatsTable;
  
import {Paper, TableCell, TableContainer } from '@material-ui/core';
import useSWR from 'swr'
import {Table, TableBody, TableHead, TableRow} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';


export default function Doctor() {
    const fetcher =( url:any )=> fetch(url.toString()).then(r => r.json());

    const { data, error, isLoading } = useSWR('http://localhost:8080/doctor', fetcher)

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    return (
        <div>
            <h3>Welcome Doctors...!!!</h3>
            <div style={{
                textAlign: "end"
            }}><AddIcon /></div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">FirstName</TableCell>
                            <TableCell align="right">LastName</TableCell>
                            <TableCell align="right">Specialization</TableCell>
                            <TableCell align="right">Schedule</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((doctor:any) => (
                            <TableRow
                                key={doctor.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {doctor.doctor_id}
                                </TableCell>
                                <TableCell align="right">{doctor.first_name}</TableCell>
                                  <TableCell align="right">{doctor.last_name}</TableCell>
                                <TableCell align="right">{doctor.specialization}</TableCell>
                                <TableCell align="right">{doctor.schedule}</TableCell>
                                <TableCell align="right">
                                    <EditIcon/>
                                    <DeleteIcon/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
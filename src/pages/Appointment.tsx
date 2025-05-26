import {Paper, TableCell, TableContainer } from '@material-ui/core';
import useSWR from 'swr'
import {Table, TableBody, TableHead, TableRow} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';


export default function Appointment() {
    const fetcher =( url:any )=> fetch(url.toString()).then(r => r.json());

    const { data, error, isLoading } = useSWR('http://localhost:8080/appointment', fetcher)

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    return (
        <div>
            <h3>Welcome Appointed Patients...!!!</h3>
            <div style={{
                textAlign: "end"
            }}><AddIcon /></div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="center">APP ID</TableCell>
                            <TableCell align="center">DATE</TableCell>
                            <TableCell align="center">PAT ID</TableCell>
                            <TableCell align="center">DOC ID</TableCell>
                            <TableCell align="center">CONSULTING FOR</TableCell>
                            <TableCell align="center">STATUS</TableCell>
                            <TableCell align="center">ACTIONS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((appointment:any) => (
                            <TableRow
                                key={appointment.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {appointment.appointment_id}
                                </TableCell>
                                <TableCell align="center">{appointment.appointment_id}</TableCell>
                                <TableCell align="center">{appointment.appointment_date}</TableCell>
                                <TableCell align="center">{appointment.patient_id}</TableCell>
                                <TableCell align="center">{appointment.doctor_id}</TableCell>
                                <TableCell align="center">{appointment.consulting_for}</TableCell>
                                <TableCell align="center">{appointment.status}</TableCell>
                                <TableCell align="center">
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
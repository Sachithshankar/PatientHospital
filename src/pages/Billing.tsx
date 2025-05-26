import {Paper, TableCell, TableContainer } from '@material-ui/core';
import useSWR from 'swr'
import {Table, TableBody, TableHead, TableRow} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';


export default function Billing() {
    const fetcher =( url:any )=> fetch(url.toString()).then(r => r.json());

    const { data, error, isLoading } = useSWR('http://localhost:8080/billing', fetcher)

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    return (
        <div>
            <h3>Showing Bills...!!!</h3>
            <div style={{
                textAlign: "end"
            }}><AddIcon /></div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="center">BILL ID</TableCell>
                            <TableCell align="center">PAT. ID</TableCell>
                            <TableCell align="center">APP. ID</TableCell>
                            <TableCell align="center">BILL DATE</TableCell>
                            <TableCell align="center">TOTAL AMT</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((billing:any) => (
                            <TableRow
                                key={billing.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {billing.billing_id}
                                </TableCell>
                                <TableCell align="center">{billing.billing_id}</TableCell>
                                <TableCell align="center">{billing.patient_id}</TableCell>
                                <TableCell align="center">{billing.appointment_id}</TableCell>
                                <TableCell align="center">{billing.billing_date}</TableCell>
                                <TableCell align="center">{billing.total_amount}</TableCell>
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
import {Paper, TableCell, TableContainer } from '@material-ui/core';
import useSWR, {mutate} from 'swr'
import {Table, TableBody, TableHead, TableRow} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {useState} from "react";
import DoctorDialog from "../components/DoctorDialog";

type Doctor = {
    doctor_id: bigint;
    first_name: string;
    last_name: string;
    specialization: string;
    schedule: string;
};


export default function Doctor() {
    const fetcher =( url:any )=> fetch(url.toString()).then(r => r.json());
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

    const { data, error, isLoading, mutate } = useSWR('http://localhost:8080/doctor', fetcher)

    const handleClose =  ()=> {
        setDialogOpen(false);
        setEditingDoctor(null);
        mutate();
    }

    const handleAddClick = () => {
        setEditingDoctor(null);
        setDialogOpen(true);
    };

    const handleEditClick = (doctor: Doctor) => {
        setEditingDoctor(doctor);
        setDialogOpen(true);
    }

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    const handleAddDoctor = async (doctor: Omit<Doctor, 'doctor_id'>) => {
        const res = await fetch('http://localhost:8080/doctor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(doctor),
        });

        if (!res.ok) {
            throw new Error('API error while saving doctor');
        }
    };

    const handleEditDoctor = async (updatedDoctor: Doctor) => {
        console.log('edit patient')
        const response = await fetch(`http://localhost:8080/doctor/${updatedDoctor.doctor_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedDoctor),
        });
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || 'Failed to update patient');
        }else {
            handleClose();
        }
    };


    const handleDelete = async (doctorId: string) => {
        const res = await fetch(`http://localhost:8080/doctor/${doctorId}`, {
            method: 'DELETE',
        });

        if (!res.ok) {
            throw new Error('Failed to delete doctor');
        }
        else {
             mutate();
        }};


    return (
        <div>
            <h3>Welcome Doctors...!!!</h3>
            <div style={{
                textAlign: "end"
            }}><AddIcon onClick={handleAddClick} style={{cursor: "pointer"}}/></div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="center">FirstName</TableCell>
                            <TableCell align="center">LastName</TableCell>
                            <TableCell align="center">Specialization</TableCell>
                            <TableCell align="center">Schedule</TableCell>
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
                                <TableCell align="center">{doctor.first_name}</TableCell>
                                  <TableCell align="center">{doctor.last_name}</TableCell>
                                <TableCell align="center">{doctor.specialization}</TableCell>
                                <TableCell align="center">{doctor.schedule}</TableCell>
                                <TableCell align="center">
                                    <EditIcon onClick={() => handleEditClick(doctor)} style={{cursor: "pointer"}}/>
                                    <DeleteIcon onClick={() => handleDelete(doctor.doctor_id)} style={{cursor: "pointer"}}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <DoctorDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                initialData={editingDoctor ?? undefined}
                mutateDoctor= {mutate}/>
        </div>
    )
}
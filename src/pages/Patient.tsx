import {Paper, TableCell, TableContainer } from '@material-ui/core';
import useSWR from 'swr'
import {Table, TableBody, TableHead, TableRow} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PatientDialog from "../components/PatientDialog";
import {useState} from "react";

type Patient = {
    patient_id: bigint;
    patient_name: string;
    address: string;
    phone: string;
};

export default function Patient() {
    const fetcher =( url:any )=> fetch(url.toString()).then(r => r.json());
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
    const { data, error, isLoading, mutate } = useSWR('http://localhost:8080/patient', fetcher)

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    const handleClose =  ()=> {
        setDialogOpen(false);
        setEditingPatient(null);
        mutate();
    }

    const handleAddClick = () => {
        setEditingPatient(null);
        setDialogOpen(true);
    };

    const handleEditClick = (patient: Patient) => {
        setEditingPatient(patient);
        setDialogOpen(true);
    }

    const handleAddPatient = async (newPatient: Omit<Patient, 'patient_id'>) => {
        console.log('post patient')
        const response = await fetch('http://localhost:8080/patient', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPatient),
        });
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || 'Failed to add patient');
        }else {
            handleClose();
        }
    };

    const handleEditPatient = async (updatedPatient: Patient) => {
        console.log('edit patient')
        const response = await fetch(`http://localhost:8080/patient/${updatedPatient.patient_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedPatient),
        });
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || 'Failed to update patient');
        }else {
            handleClose();
        }
    };


    const handleDeletePatient = async (patientId: any) =>{
        console.log('delete patient')
        const res = await fetch(`http://localhost:8080/patient/${patientId}`, {
            method: 'DELETE'
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.message || 'API Error');
        }else
            mutate();
    }

    return (
        <div>
        <h3>Welcome Patients...!!!</h3>
            <div style={{
                textAlign: "end"
            }}><AddIcon onClick={handleAddClick} style={{ cursor: 'pointer' }} /></div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Address</TableCell>
                            <TableCell align="center">Phone</TableCell>
                            <TableCell align="center">ACTION</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((patient:any) => (
                            <TableRow
                                key={patient.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {patient.patient_id}
                                </TableCell>
                                <TableCell align="center">{patient.patient_name}</TableCell>
                                <TableCell align="center">{patient.address}</TableCell>
                                <TableCell align="center">{patient.phone}</TableCell>
                                <TableCell align="center">
                                    <EditIcon onClick={() => handleEditClick(patient)}
                                                     style={{ cursor: 'pointer'}}/>
                                    <DeleteIcon onClick={()=>handleDeletePatient(patient.patient_id)}
                                                style={{ cursor: 'pointer'}}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <PatientDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                initialData={editingPatient ?? undefined}
                mutatePatient= {mutate}
            />
        </div>
    )
}
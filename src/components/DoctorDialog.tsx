import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Typography
} from '@mui/material';

type Doctor = {
    first_name: string;
    last_name: string;
    specialization: string;
    schedule: string;
};

type DoctorDialogProps = {
    open: boolean;
    onClose: () => void;
    mutateDoctor: any;
    initialData?: any;
}

const DoctorDialog: React.FC<DoctorDialogProps> = ({ open, onClose,mutateDoctor, initialData }) => {
    const [formData, setFormData] = useState<Doctor>({
        first_name: '',
        last_name: '',
        specialization: '',
        schedule: '',
    });

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                first_name: '',
                last_name: '',
                specialization: '',
                schedule: '',
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        const { first_name, last_name, specialization, schedule } = formData;
        if (!first_name || !last_name || !specialization || !schedule) {
            setError('All fields are required.');
            return;
        }

        try {
            const res = await fetch('http://localhost:8080/doctor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!res.ok) throw new Error('API Error');
            mutateDoctor()
            setError(null);
            onClose();
        } catch (e) {
            setError('Failed to save doctor. Please try again.');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{initialData ? 'Edit Doctor' : 'Add Doctor'}</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2} mt={1}>
                    <TextField
                        label="First Name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Last Name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Specialization"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Schedule"
                        name="schedule"
                        value={formData.schedule}
                        onChange={handleChange}
                        required
                    />
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DoctorDialog;
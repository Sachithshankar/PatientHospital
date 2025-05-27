import React, {useEffect, useState} from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from '@mui/material';

type PatientData = {
  patient_name: string;
  address: string;
  phone: string;
};
type Patient = PatientData & {
  patient_id: bigint;
}
type Props =
    | {
  open: boolean;
  onClose: () => void;
  mutatePatient: any;
  initialData?: undefined;
}
    | {
  open: boolean;
  onClose: () => void
  mutatePatient:any
  initialData: Patient;
};

const PatientDialog: React.FC<Props> = ({ open, onClose, mutatePatient, initialData }) => {
  console.log('xxx initial data',initialData)

  const [formData, setFormData] = useState<PatientData>({
    patient_name: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    if(initialData)
      setFormData({...initialData})
  }, [initialData]);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    console.log('xxx submit data',formData)

    const { patient_name, address, phone } = formData;

    if (!patient_name || !address || !phone) {
      setError('All fields are required.');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/patient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('API Error');
      mutatePatient()

      setError(null);
      onClose();
    } catch (err) {
      setError('Failed to save patient. Please try again.');
    }
  };

  return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>New Patient</DialogTitle>
        <DialogContent>
          <Box component="form" display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
                label="Patient Name"
                name="patient_name"
                value={formData.patient_name}
                onChange={handleChange}
                required
            />
            <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
            />
            <TextField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
            />
            {error && (
                <Typography variant="body2" color="error">
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

export default PatientDialog;

// src/components/NewRecordForm.tsx

import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';

interface NewRecordFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const NewRecordForm: React.FC<NewRecordFormProps> = ({ open, onClose, onSubmit }) => {
  const initialValues = {
    name: '',
    surname: '',
    phoneNumber: '',
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await axios.post('http://localhost:3001/phonebook', values);
      onSubmit();
      onClose();
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add New Record</DialogTitle>
      <DialogContent>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <Field as={TextField} autoFocus fullWidth margin="normal" name="name" label="Name" />
            <Field as={TextField} fullWidth margin="normal" name="surname" label="Surname" />
            <Field as={TextField} fullWidth margin="normal" name="phoneNumber" label="Phone Number" />
            <DialogActions>
              <Button type="submit" color="primary">
                Add
              </Button>
              <Button onClick={onClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default NewRecordForm;

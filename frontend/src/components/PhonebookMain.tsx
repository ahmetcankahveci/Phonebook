import { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';

interface RecordType {
  id: number;
  name: string;
  surname: string;
  phoneNumber: string;
}

const PhonebookMain = () => {
  const [rows, setRows] = useState<RecordType[]>([]);
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<RecordType | null>(null);
  const [recordToUpdate, setRecordToUpdate] = useState<RecordType | null>(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get<RecordType[]>('http://localhost:3001/phonebook');
      const dataWithIds = response.data.map((record, index) => ({ ...record, id: index + 1 }));
      setRows(dataWithIds);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setDeleteDialogOpen(false);
    setRecordToDelete(null);
    setRecordToUpdate(null);
  };

  const handleAddRecord = async (values: RecordType) => {
    try {
      const response = await axios.post<RecordType>('http://localhost:3001/phonebook', values);
      const newRecord = response.data;
      setRows([...rows, newRecord]);
      handleClose();
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  const handleUpdateClick = (record: RecordType) => {
    setRecordToUpdate(record);
    setOpen(true);
  };

  const handleUpdate = async (id: number, updatedRecord: RecordType) => {
    try {
      await axios.put<RecordType>(`http://localhost:3001/phonebook/${id}`, updatedRecord);
      const updatedRows = rows.map(row => (row.id === id ? updatedRecord : row));
      setRows(updatedRows);
      handleClose();
    } catch (error) {
      console.error(`Error updating record with id ${id}:`, error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/phonebook/${id}`);
      const updatedRows = rows.filter(row => row.id !== id);
      setRows(updatedRows);
      handleClose();
    } catch (error) {
      console.error(`Error deleting record with id ${id}:`, error);
    }
  };

  const handleConfirmDelete = (record: RecordType) => {
    setRecordToDelete(record);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (recordToDelete) {
      await handleDelete(recordToDelete.id);
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'surname', headerName: 'Surname', width: 150 },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <Button
            variant="outlined"
            onClick={() => handleUpdateClick(params.row as RecordType)}
            style={{ marginRight: 8 }}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleConfirmDelete(params.row as RecordType)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Button variant="outlined" onClick={handleOpen} style={{ marginBottom: 16 }}>
        New
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{recordToUpdate ? 'Update Record' : 'New Record'}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={recordToUpdate || { id: 0, name: '', surname: '', phoneNumber: '' }}
            onSubmit={(values, { resetForm }) => {
              if (recordToUpdate) {
                handleUpdate(recordToUpdate.id, values);
              } else {
                handleAddRecord(values);
              }
              resetForm();
              handleClose();
            }}
          >
            <Form>
              <Field
                as={TextField}
                name="name"
                label="Name"
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <Field
                as={TextField}
                name="surname"
                label="Surname"
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <Field
                as={TextField}
                name="phoneNumber"
                label="Phone Number"
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Save</Button>
              </DialogActions>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          {recordToDelete && (
            <div>
              Are you sure you want to delete the record with ID {recordToDelete.id}?
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteConfirmed} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default PhonebookMain;

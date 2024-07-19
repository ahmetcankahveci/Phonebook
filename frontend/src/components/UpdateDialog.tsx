import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { RecordType } from '../types';

interface UpdateDialogProps {
  open: boolean;
  onClose: () => void;
  record: RecordType;
  onSaveUpdatedRecord: (record: RecordType) => void;
}

const UpdateDialog: React.FC<UpdateDialogProps> = ({ open, onClose, record, onSaveUpdatedRecord }) => {
  const initialValues: RecordType = { ...record };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    surname: Yup.string().required('Required'),
    phoneNumber: Yup.string().required('Required'),
  });

  const onSubmit = (values: RecordType, formikHelpers: FormikHelpers<RecordType>) => {
    onSaveUpdatedRecord(values);
    formikHelpers.setSubmitting(false);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Record</DialogTitle>
      <DialogContent>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div>
                <Field type="text" name="name" placeholder="Name" />
                <ErrorMessage name="name" component="div" />
              </div>
              <div>
                <Field type="text" name="surname" placeholder="Surname" />
                <ErrorMessage name="surname" component="div" />
              </div>
              <div>
                <Field type="text" name="phoneNumber" placeholder="Phone Number" />
                <ErrorMessage name="phoneNumber" component="div" />
              </div>
              <DialogActions>
                <Button onClick={onClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} color="primary">
                  Save
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDialog;

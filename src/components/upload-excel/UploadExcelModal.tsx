import React, { useEffect, useState } from 'react'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Dialog } from 'primereact/dialog'
import '@mui/material/styles';
import { ErrorMessage, Form, Formik } from 'formik'
import { PulseLoader } from 'react-spinners'
import * as Yup from 'yup'; // For validation
import { uploadExcel, uploadExcelStatus } from '@/redux/actions/userActionTypes'
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@/redux/types';
import PreviewExcel from './PreviewExcel';

type Props = {
    setVisible: (visible: boolean) => void;
    visible: boolean;
    isEdit: boolean;
}

const UploadExcelModal = (props: Props) => {
    const dispatch = useDispatch()
    const { uploadStatusFile, uploadFileLoader} = useSelector((state: AppState) => state.userData);
 
    const { setVisible, visible, isEdit } = props;

    const [excelFileData, setExcelFileData] = useState<any>([]);

    const excelFileLenght = excelFileData.length;
    // console.log('excelFileData ==>', excelFileData);
    
    const validationSchema = Yup.object({
        importExcel: Yup.mixed().required('Excel file is required'),
      });
    
    const uploadExcelHandler = (file:any) => {
        // Upload Excel file
        console.log('Excel uploaded successfully', file);
    }
    useEffect(() => {
      if(uploadStatusFile){
        setVisible(false);
        setExcelFileData([]);
        dispatch(uploadExcelStatus(false));
      }
    }, [uploadStatusFile])

    const cancelHandler = () => {
        setExcelFileData([]);
        setVisible(false)
    }

    return (
        <div className="card flex justify-content-center scroll-m-0 ">
            <Dialog visible={visible} className='max-w-[500px]' header={`${isEdit ? "Update" : "Upload Excel"}`} style={{ width: '60%' }} draggable={false} onHide={() => setVisible(false)}>
                <Formik
                    enableReinitialize
                    initialValues={{
                        importExcel: excelFileData || null,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log('values ==>', values);
                        dispatch(uploadExcel(excelFileData));
                    }}
                >
                    {({ values, setFieldValue, errors, touched }) => (
                        <Form className="form-input my-7">

                            <PreviewExcel setExcelFileData={setExcelFileData} excelFileLenght={excelFileLenght} />

                            {/* Submit Button */}
                            <div className="my-3 flex justify-between">
                                <button type="button" className="btn btn-light p-4 w-[150px] me-3 h-[52px]" onClick={() => cancelHandler()} >
                                    Cancel
                                </button>
                                <button type="submit" disabled={excelFileLenght == 0} className="btn btn-dark w-full h-[52px]" >
                                    {uploadFileLoader ? <PulseLoader color="#ffffff" /> : 'Upload'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>


            </Dialog>
        </div>
    )
}

export default UploadExcelModal
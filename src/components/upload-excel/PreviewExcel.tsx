import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCross, FaFileExcel, FaTrain, FaX } from 'react-icons/fa6';
import { IoMdCloudUpload } from 'react-icons/io';
import * as XLSX from 'xlsx';

type Props = {
    setExcelFileData: (data: any) => void;
    excelFileLenght: (data: any) => void;
};

function PreviewExcel(props: Props) {
    const { setExcelFileData, excelFileLenght } = props;
    const [columnCounts, setColumnCounts] = useState<Record<string, number>>({});
    const [file, setFile] = useState<{ name: string; preview: string; data: any } | null>(null);

    const schema = [
        "FirstName",
        "LastName",
        "Email",
        "Gender",
        "Age",
        "AboutMe",
        "Location",
        "HashTags",
        "PartnerRestaurant",
        "AwardYear",
        "AwardName",
        "SocialLink",
        "ProfileImage",
    ];

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [], // .xlsx
            'application/vnd.ms-excel': [] // .xls
        },
        onDrop: acceptedFiles => {
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                const reader = new FileReader();

                // Read the Excel file as an ArrayBuffer
                reader.onload = () => {
                    const data = new Uint8Array(reader.result as ArrayBuffer);
                    const workbook = XLSX.read(data, { type: 'array' });

                    // Extract data from the first sheet
                    const sheetName = workbook.SheetNames[0]; // Get the first sheet name
                    const sheet = workbook.Sheets[sheetName];
                    let sheetData: any[] = XLSX.utils.sheet_to_json(sheet); // Get the sheet data as an array
                    // const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Get the sheet data as an array

                    sheetData = sheetData.map(row => {
                        const filledRow: Record<string, any> = {};
                        schema.forEach(key => {
                            const value = row[key];
                            // Convert value to a string
                            if (Array.isArray(value)) {
                                // Convert array to a comma-separated string or empty if the array is empty
                                filledRow[key] = value.length > 0 ? JSON.stringify(value) : "";
                            } else if (value && typeof value === "object") {
                                // Convert object to JSON string
                                filledRow[key] = JSON.stringify(value);
                            } else {
                                // For primitive types, ensure it's a string or default to an empty string
                                filledRow[key] = value !== undefined && value !== null ? String(value) : "";
                            }
                        });
                        return filledRow;
                    });

                    // Initialize count for row and column
                    const schemaKeys = Object.keys(sheetData[0] || {});
                    const columnCounts: Record<string, number> = {};
                    schemaKeys.forEach(key => {
                        columnCounts[key] = 0; // Initialize count for each column
                    });
                    sheetData.forEach(row => {
                        schemaKeys.forEach(key => {
                            if (row[key] !== "" && row[key] !== null) {
                                columnCounts[key] += 1; // Increment count if the value is not empty
                            }
                        });
                    });
                    console.log("setColumnCounts ==>", columnCounts);
                    setColumnCounts(columnCounts);

                    setExcelFileData(sheetData);

                    // Set the new file, replacing any existing file
                    setFile({
                        name: file.name,
                        preview: URL.createObjectURL(file),
                        data: sheetData
                    });
                };

                reader.readAsArrayBuffer(file); // Trigger the file reading
            }
        }
    });

    useEffect(() => {
        // Revoke object URLs to prevent memory leaks
        return () => {
            if (file) URL.revokeObjectURL(file.preview);
        };
    }, [file]);

    const cancelHandler = () => {
        setExcelFileData([]);
        setFile(null)
    }

    return (
        <section className="relative">
            <div
                {...getRootProps({
                    className: 'dropzone border-dashed border-2 rounded-lg !h-36 cursor-pointer flex justify-center items-center text-center mb-5'
                })}
            >
                <input {...getInputProps()} name="importExcel" />
                <div className='flex justify-center items-center text-center flex-col'>
                    <IoMdCloudUpload className='text-gray-300' size={80} />
                    <p className='my-0 text-sm mb-3'>Drag 'n' drop an Excel file here, or click to select a file <br /> (Only .xls, .xlsx format Accepted)</p>
                </div>
            </div>
            {file && (
                <aside className="thumbsContainer">
                    <div className="thumb">
                        <div className="thumbInner">
                            <div className="file-info flex items-center gap-2">
                                <FaFileExcel className="text-green-600" size={24} />
                                <span className="file-name">{file.name}</span>
                            </div>
                        </div>
                        <FaX onClick={() => cancelHandler()} className="text-red-600 cursor-pointer absolute right-3 top-[15px] h-4 w-4" size={14} />
                    </div>
                </aside>
            )}
            {/* <div className="excel-preview">
                {Object.keys(columnCounts).length > 0 && (
                    <div>
                        <h4 className='my-2'>Preview Data Counts:</h4>
                        <table className='w-full border'>
                            <thead>
                                {Object.entries(columnCounts).map(([column, count]) => (
                                    <tr className='w-full border'>
                                        <th key={column} className='border p-2 text-left w-3/5'>{column}</th>
                                        <td key={count} className='border p-2 w-2/5'>{count}</td>
                                    </tr>
                                ))}
                            </thead>
                        </table>
                    </div>
                )}
            </div> */}
        </section>
    );
}

export default PreviewExcel;

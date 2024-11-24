import React from "react";
import "../styles/PagesAdmin.css";
import "../styles/FitnessCenterCordinator.css";

const AttendanceTable = ({ columns, data }) => (
    <table className="table">
        <thead className="table-header-head">
            <tr className="table-row">
                {columns.map((column, index) => (
                    <th key={index} className="table-cell">{column}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {data.map((row, index) => (
                <AttendanceTableRow
                    key={index}
                    row={row}
                />
            ))}
        </tbody>
    </table>
);

const AttendanceTableRow = ({ row }) => (
    
    <tr className="table-row">
        <td className="table-cell">{row.dayName}</td>
        <td className="table-cell">{row.shift}</td>
        <td className="table-cell">{row.placeAvailable}</td>
        <td className="table-cell">{row.attended}</td>
        <td className="table-cell">{row.noAttended}</td>
        <td className="table-cell">{row.total}</td>
    </tr>
);

export default AttendanceTable;

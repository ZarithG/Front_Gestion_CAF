import React, { useEffect, useState } from "react";
import { BarChart, ResponsiveContainer,XAxis,YAxis,CartesianGrid,Bar,Tooltip,Legend} from "recharts";

const GraphicBarShift = ({shifts}) =>{

    const customTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{ backgroundColor: "#fff", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
                    <p><strong>Turno:</strong> {label}</p>
                    <p><strong>Asistencias:</strong> {payload[0].value}</p>
                    <p><strong>No asistieron:</strong> {payload[1].value}</p>
                </div>
            );
        }
        return null;
    };

    return(
        
        <ResponsiveContainer width="100%" aspect={3}>
            <BarChart data={shifts} width={500} height={300} margin={ {top:5, right:30,left:20, bottom:20}}>
                <CartesianGrid strokeDasharray="4 1 2" />
                <XAxis dataKey="shift" label={{ value: "Turno", position: "insideBottom", offset: -20 }} />
                
                {/* Etiqueta personalizada en el eje Y */}
                <YAxis label={{ value: "Cantidad de turnos", angle: -90, position: "insideLeft" }} />
                <Tooltip content={customTooltip}/>
                <Legend  wrapperStyle={{ marginTop: 60, paddingTop:30 }} formatter={(value) => (value === "shiftsAttended" ? "Asistencias" : "No asistieron")} />
                <Bar dataKey="attended" fill="#FFCC00" />
                <Bar dataKey="noAttended" fill="#878787" />
            </BarChart>
        </ResponsiveContainer>
    )
}
export default GraphicBarShift;
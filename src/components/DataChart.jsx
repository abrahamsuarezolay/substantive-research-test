import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LabelList, ResponsiveContainer, Line, LineChart, CartesianGrid } from 'recharts';


const DataChart = ({ dataGroupedByName, sampleSize }) => {

    return (
        <div id="datachart" className="flex flex-col align-middle">
            <div className="flex flex-col justify-center mt-[5%]">
                <h1 className="flex justify-center text-[#112a42] mb-[5%]">Number of interactions</h1>
                <div className="flex justify-center">
                    <ResponsiveContainer width="100%" height={600}>
                        <BarChart data={dataGroupedByName} layout="horizontal">
                            <XAxis dataKey="name" domain={[0, "dataMax"]} />
                            <YAxis domain={[0, "dataMax + 14"]} />
                            <Tooltip />
                            <Bar dataKey="value" fill="#112a42" barSize={80}>
                                <LabelList dataKey="value" position="top" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="flex flex-col justify-center mt-[10%]">
                <h1 className="flex justify-center text-[#112a42] mb-[5%]">Percentage of Interactions</h1>
                <div className="flex justify-center">
                    <ResponsiveContainer width="100%" height={600}>
                        <LineChart data={dataGroupedByName}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" domain={[0, "dataMax"]} />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="percentage" stroke="#112a42" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default DataChart;
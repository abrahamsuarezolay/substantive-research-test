import logo from "../assets/logo.png"
import { useEffect, useState, useRef } from "react"
import DataChart from "./DataChart"
import axios from "axios"

const Home = () => {

    const [data, setData] = useState(null)
    const [interactions, setInteractions] = useState([]);
    const [dataGroupedByName, setDataGroupedByName] = useState([{}]);
    const [showData, setShowData] = useState(false);

    const url = "https://substantive.pythonanywhere.com/"
    const dataChartRef = useRef(null)

    const retrieveData = () => {
            axios.get(url).then((response) => {
                setData(response.data);
            });
            if(data!=null){
                organizeData();
            }
    };

    const organizeData = () => {
        console.log(data);
        const interactions = data.interactions;
        const countByName = {};

        interactions.forEach(interaction=> {
            const name = interaction.name;
            if (countByName[name]) {
                countByName[name]++;
            } else {
                countByName[name] = 1;
            }
        });

            const newArray = Object.entries(countByName).map(([name, value]) => ({
                name: name,
                value: value,
                percentage: ((value*100)/interactions.length).toFixed(1)
            }));
        
            setDataGroupedByName(newArray);
            console.log(dataGroupedByName);
            setShowData(true);
        };   

        useEffect(()=>{
            retrieveData();
        }, [])

        useEffect(()=>{
            if(showData){
                document.getElementById("datachart").scrollIntoView();
            }
        }, [showData])

    return (
        <div>
            <header>
                <nav className="bg-[#112a42] rounded-b-lg">
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="flex flex-1 justify-between mt-2 sm:items-stretch">
                                <div className="flex flex-shrink-0">
                                    <img className="h-8 w-auto" src={logo} alt="Your Company" />
                                </div>
                                <div className="flex flex-shrink-0 items-center">
                                    <button className="bg-[#66cccc] text-[#112a42] border-2 border-[#112a42] rounded-lg p-1.5 hover:ease-in duration-300 hover:bg-[#112a42] hover:text-[#66cccc] hover:border hover:border-[#66cccc]" type="button"><a href="https://substantiveresearch.com/">Get in touch</a></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <div>
                <div>
                    <img className="mx-auto h-1/3 w-1/3" src={logo} />
                </div>
                <div className="flex flex-shrink-0 items-center justify-center m-5">
                    <button className="opacity-95 bg-[#112a42] text-[#66cccc] border-2 border-[#66cccc] rounded-lg p-1.5 hover:ease-in duration-300 hover:bg-[#66cccc] hover:text-[#112a42] hover:border hover:border-[#112a42]" type="button" onClick={retrieveData}>Click here to retrieve the data</button>
                </div>
                
                {showData ? (
                    
                <div className="m-[10%]" id="datachart">
                    <DataChart dataGroupedByName={dataGroupedByName} sampleSize={interactions.length}/>
                </div>
                ):(
                    <div>
                        </div>
                )}
             
                
            </div>
        </div>)

}

export default Home;
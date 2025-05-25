import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import Patient from "./Patient";
import Doctor from "./Doctor";
import Appointment from "./Appointment";
import Billing from "./Billing";


export default function Home() {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    const [showPatients, setShowPatients] = useState<boolean>(true);
    const [showDoctors, setShowDoctors] = useState<boolean>(false);
    const [showAppointment, setShowAppointment] = useState<boolean>(false);
    const [showBilling, setShowBilling] = useState<boolean>(false);


    const handlePatient = () => {
        navigate("/patient");
    };

    const handleDoctor = () => {
        navigate("/doctor");
    }


    return (
        <div>
            <h1>Welcome to DAADA's Hospital</h1>
            <div
                style={{
                    marginLeft: "23%",
                    marginRight: "20%",
                    marginBottom: "60%",
                    marginTop: "5%"
                }}
            >

                <Paper square>
                    <Tabs
                        value={value}
                        textColor="primary"
                        indicatorColor="primary"
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    >
                        <Tab label="Patient" onClick={() => {setShowPatients(!showPatients);
                                                                    setShowDoctors(false);
                                                                    setShowAppointment(false);
                                                                    setShowBilling(false)}} />
                        <Tab label="Doctor" onClick={() => {setShowDoctors(!showDoctors); setShowPatients(false);
                                                                    setShowAppointment(false);
                                                                         setShowBilling(false)}}/>
                        <Tab label="Appointment" onClick={() => {setShowAppointment(!showAppointment);
                                                                        setShowPatients(false);
                                                                      setShowDoctors(false);
                                                                        setShowBilling(false)}}/>

                        <Tab label="Billing" onClick={() => {setShowBilling(!showBilling);
                                                                    setShowAppointment(false);
                                                                    setShowPatients(false);
                                                                    setShowDoctors(false);}} />
                    </Tabs>
                </Paper>
                {showPatients && <Patient />}
                {showDoctors && <Doctor />}
                {showAppointment && <Appointment />}
                {showBilling && <Billing />}
            </div>
        </div>
    );
}
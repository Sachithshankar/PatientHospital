import {useNavigate} from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/patient");
    };


    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={handleClick}>view Patient</button>
        </div>
    );
}
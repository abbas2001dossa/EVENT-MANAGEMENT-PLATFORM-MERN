import react,{useEffect} from "react";
import '../Styles/Spinner.css';
import { useNavigate } from 'react-router-dom';



export default function Spinner(props) {

    const navigate = useNavigate();

    useEffect(() => {
        // Set a timeout to redirect after 5 seconds
        const redirectTimeout = setTimeout(() => {
          // Replace "/target-page" with the URL of the page you want to redirect to
          navigate('/', { replace: true });
        }, 2000);
    
        // Clean up the timeout when the component unmounts
        return () => clearTimeout(redirectTimeout);
      }, [navigate]);

    return (
        <div className="spinner-container">
     
            <svg width="100%"  viewBox="0 0 276 276" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <g id="spinner">
                    <circle id="bottom" cx="138" cy="138" r="114" stroke="#DBDBDB" stroke-width="18" />
                    <circle id="upper" cx="138" cy="138" r="123" stroke="#72BBFF" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="373 100" style={{animationDuration:props.speed+"s"}}/>
                </g>
            </svg>
            <p>{props.customText}</p>
            </div>

    )
}
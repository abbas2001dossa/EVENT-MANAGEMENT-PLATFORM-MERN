import React,{useState,useEffect} from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
// import '../Styles/Card.css';



const Card=(props)=> {
    const location = useLocation();
    const navigate = useNavigate();
    const [event,setEvent]=useState();


    useEffect(() => {
      
        console.log("event" + props.event);
        if (props.event != null){
            setEvent(props.event);
        }
        

    }, [props.event]);

    useEffect(() => {
      
    if (props.event2 != null){
            setEvent(props.event2);
        }
     
    }, [props.event2])
    
    

    const shadows ={
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    }

    // userName ??
    function EventManage(arg){
        const currentUrl = location.pathname;
        const newUrl = `${currentUrl}/${arg}`;
        navigate(newUrl);
    }

    const [visible,SetVisible]= useState(props.display);
    const beautify ={
        marginLeft: '150px',
        borderRadius:'15px',
        width:'55px',
        height:'35px',
        
        color:'white',
        fontSize : '20px',
        fontWeight : 'bolder',
        border : '1px solid white',
        display : visible
    };

   
    

    const mystyle={
        
        filter: props.event >= 3 || props.event2 >= 5 ? 'blur(5px)' : 'none',
    }

  return (
    <>
      <div className="col-lg-4 mt-5">
      
      <div className={`card card-margin ${props.color ? `bg-${props.color}` : ''}`} style={mystyle}>
            <div className="card-header no-border">
                <h5 className="card-title text-size-lg fw-bolder text-shadow" style={shadows}> {props.title}</h5>
                <button className='bg-black text-large text-center' style={beautify} > {event} </button>
            </div>
            <div className="card-body pt-0">
                <div className="widget-49">
                    <div className="widget-49-title-wrapper">
                        <div className="widget-49-date-primary">
                            <span className="widget-49-date-day">{props.day}</span>
                            <span className="widget-49-date-month">{props.month}</span>
                        </div>
                        <div className="widget-49-meeting-info">
                            <span className="text-black fw-bold widget-49-pro-title">{props.description}</span>
                            
                        </div>
                    </div>
                    
                    <div className="widget-49-meeting-action">
                        <button type="button"  onClick={() => EventManage(props.eventmanage)} className="hoverNow btn btn-sm border-black fw-bold">Click Now </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Card

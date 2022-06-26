import React from 'react'; 
import { MdHistoryEdu } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const PlayMenu = () => {
    const navigate = useNavigate();   
    const playMenuStyling = { 'marginTop': '20px' }
    const iconStyling = {
        fontSize: '2em',
        color: 'white'
    };
    
    return (
        <div style={playMenuStyling}>
            <MdHistoryEdu style={iconStyling} onClick={(event) => {
                event.preventDefault();
                navigate('/history');
            }}/>
        </div>
    );
};

export default PlayMenu;
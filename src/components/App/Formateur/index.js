import { Icon } from "@iconify/react";
import './index.css'    

const Formateur = ({ name, icon , index }) => {

    const onClick=(e)=>{
        console.log(e.target);
        const span=e.target;
            if(span.classList.contains('clicked')){
                span.classList.remove('clicked');


            }else{
                span.classList.add('clicked');
            }
    }
    return (
        <li key={index} className='formateur' >
            <span onClick={onClick} className='nomFormateur'>{name}</span>
            {
                icon && <Icon icon={icon} />
            }
        </li >
    )


}

export default Formateur;
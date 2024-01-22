import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import './index.css';
import Formateur from '../App/Formateur';
const ListForamteurs = () => {

    const [text,setText]=useState('');

    const profList = [
        {

            name: "Guillame Thierry",
            icon: "fa-brands:symfony",
        },
        {
            name: "Clement Reymond",
            icon: "fa-brands:php",
        }
        ,
        {
            name: "Jean-Michel",
            icon: "fa-brands:html5",
        }
        ,
        {
            name: "Romain Lejeune",
            icon: "fa-brands:css3",
        }
    ];

    return (
     <div>

        <input type="text" placeholder="Rechercher" onChange={(e)=>setText(e.target.value)}/>
        <p>{text}</p>
        <ul>
           {
               profList.map((prof,index) => {
                   return (
                  
                            <Formateur name={prof.name} icon={prof.icon} key={index}/>   
                   )
               })
           }
        </ul>

     </div>
    );
}

export default ListForamteurs;


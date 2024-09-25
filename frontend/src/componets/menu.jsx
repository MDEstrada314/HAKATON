import React, { useState } from "react";
import logo from "../assets/slang.svg"
import "../componets/css/menu.css"



export default function Menu() {


    return(
        <div className="menu">
            <div className="logo2">
                <img src={logo} alt="" />

            </div>
            <div className="menu-dos">
                <a href=""><i class="bi bi-house-door-fill"></i> inicio</a>
                <a href=""><i class="bi bi-wrench-adjustable"></i> Actividad</a>
                <a href=""><i class="bi bi-table"></i>  Calendario</a>
                <a href=""><i class="bi bi-gear-fill"></i> conifguracion</a>
            </div>  
            <div className="usuario">
                nombre


            </div>
            



          
        </div>
    )
}
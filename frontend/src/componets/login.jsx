import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Usa useNavigate si usas React Router v6
import "./css/login.css";
import urlApi from "../data/urlApi.js";
import logo from "../assets/slang.svg"

export default function Login() {
    const navigate = useNavigate(); // Hook para la navegación

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado del formulario
        // Aquí podrías validar el formulario o realizar otras acciones como enviar los datos al servidor

        // Redirige a /home
        navigate('/home');
    }




    return (
        <div className="padre">

            <div className="contenedor">
                <div className="title">
                    <img src={logo} alt="" className="logo" />
                    <div ><h1>INICIAR SECIÓN</h1></div>

                </div>

                <form className="form" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="validationCustomUsername" class="form-label">Correo</label>
                        <div class="input-group has-validation">
                            <span class="input-group-text" id="inputGroupPrepend"><i class="bi bi-person"></i></span>
                            <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required/>
                                <div class="invalid-feedback">
                                    Please choose a username.
                                </div>
                        </div>
                    </div>
                        <div className="mb-3">
                        <label for="validationCustomUsername" class="form-label">Contraseña</label>
                        <div class="input-group has-validation">
                            <span class="input-group-text" id="inputGroupPrepend"><i class="bi bi-unlock"></i></span>
                            <input type="password" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required/>

                                <div class="invalid-feedback">
                                    Please choose a username.
                                </div>
                        </div>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit" className="boton-inicio btn btn-primary">Iniciar</button>
                </form>
            </div>
        </div>
    );
}

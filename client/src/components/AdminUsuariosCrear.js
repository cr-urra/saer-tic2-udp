import React, { Component } from 'react';
import axios from 'axios';
import {Redirect,Link} from 'react-router-dom';


import CrearUsuarioForm from './CrearUsuarioForm'

export default class AdminUsuariosCrear extends Component {
    state = {
        rut: 0,
        cod_rol: "",
        verify: undefined,
        message: "",
        verifyMessage: false,
    };

    addUsuario = async ( rut, nombre, apellido, telefono_casa, telefono_celular, roles_id, correo, password) => {
        const newUsuario = {
            rut: rut,
            nombre: nombre,
            apellido: apellido,
            telefono_casa: telefono_casa,
            telefono_celular: telefono_celular,
            roles_id: roles_id,
            correo: correo,
            password: password
        }
        const res = await axios.post("/auth/signup", newUsuario)
        alert(res.data.message)
    }

    componentDidMount = async () => {
        if(this.state.verify !== null){
            const res = await axios.get('/auth/adm/');
            this.setState({
                verify: res.data.resul,
                cod_rol: res.data.cod_rol,
                message: res.data.message
            });
        }
    };

    componentWillUnmount = () => {
        this.state.verifyMessage && alert(this.state.message);
    };



    logOut = async () => {
        const res = await axios.get("/auth/logout");
        this.setState({
            verify: res.data.resul,
            message: res.data.message
        });
    };

 
    
    render() {
        switch(this.state.verify) {
            case false:
                this.setState({
                    verifyMessage: true
                });
                return <Redirect to={{ pathname: '/users/'+this.state.cod_rol}}/>;
            case null:
                this.setState({
                    verifyMessage: true
                });
                return <Redirect to={{ pathname: '/'}}/>; 
            default:
                break;
        };
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                <span className="navbar-brand mb-0 h1">Sistema de Administración 
                <br/>
                de Edificios y Recursos</span>
                </nav>
                    <div className="container">
                        <Link className="navbar-brand" to="#">Hola, Administrador</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to={{ pathname: '/users/adm'}}>Home <span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/users/adm/reclamos'>Reclamos</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={{ pathname: '/users/adm/gastos'}}>Gastos Comunes</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={{ pathname: '/users/adm/usuarios'}}>Gestion Usuarios</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={{ pathname: '/users/adm/bodega'}}>Bodega</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={{ pathname: '/users/adm/turnos'}}>Turnos</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={{ pathname: '/users/adm/correos'}}>Correos</Link>
                                </li>
                                <li className="nav-item active">
                                    <button type="button" className="btn btn-primary" onClick={this.logOut}>
                                        Cerrar sesión
                                    </button>  
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div>
                <h1> <span className="badge badge-secondary">Gestionar Ususarios</span></h1>
                <ul className="nav nav-pills nav-fill row">
                    <li className="nav-item col-xs-12 col-md-4">
                        <a className="nav-link active" href='/users/adm/usuarios/crear'>Crear Usuario</a>
                    </li>                    
                    <li className="nav-item col-xs-12 col-md-4">
                        <a className="nav-link active" href='/users/adm/usuarios/editar'>Editar Usuario</a>
                    </li>
                    <li className="nav-item col-xs-12 col-md-4">
                        <a className="nav-link active" href='/users/adm/usuarios/eliminar'>Eliminar Usuario</a>
                    </li>  
                </ul>


                <CrearUsuarioForm addUsuario={this.addUsuario}/>         


                </div>
            </div>  
        )
    };
}

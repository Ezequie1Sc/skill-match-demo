import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

interface NavLink {
  name: string
  id: string
}

const navLinks: NavLink[] = [
  { name: "Inicio", id: "admin-inicio" },
  { name: "Mis Equipos", id: "equipos" },
  { name: "Eventos", id: "eventos" },
  { name: "Perfil", id: "perfil" },
]

function UserNavBar(){
    return (
        <h1></h1>
    )
}

export default UserNavBar
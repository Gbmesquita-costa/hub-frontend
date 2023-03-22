import { Routes, Route } from "react-router-dom"

import { Home } from "../components/home"
import { Login } from "../components/auth/login"
import { SignUp } from "../components/auth/signup"

import { Dashboard } from "../pages/dashboard"
import { DashboardMain } from "../pages/dashboardMain"
import { BusinessModal } from "../pages/business/businessModal"
import { Business } from "../pages/business"
import { UpdateModal } from "../pages/business/updateModal"
import { DeleteModal } from "../pages/business/deleteModal"

import { DashboardLocation } from "../pages/businessLocation/dashboard"
import { LocationModal } from "../pages/businessLocation/businessModal"
import { BusinessLocationPainel } from "../pages/businessLocation"
import { UpdateLocationModal } from "../pages/businessLocation/updateModal/index"
import { DeleteLocationModal } from "../pages/businessLocation/deleteModal"

export function MainRoutes (): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Home/>}>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<SignUp/>}/>
            </Route>
            <Route path="/dashboard" element={<Dashboard/>}>
                <Route path="/dashboard" element={<DashboardMain/>}/>
                <Route path="/dashboard/painel" element={<Business/>}/>
                <Route path="/dashboard/create" element={<BusinessModal/>}/>
                <Route path="/dashboard/update/:id" element={<UpdateModal/>}/>
                <Route path="/dashboard/delete/:id" element={<DeleteModal/>}/>
            </Route>
            <Route path="/dashboard/location" element={<Dashboard/>}>
                <Route path="/dashboard/location/:id" element={<DashboardLocation/>}/>
                <Route path="/dashboard/location/painel/:id" element={<BusinessLocationPainel/>}/> 
                <Route path="/dashboard/location/create/:id" element={<LocationModal/>}/> 
                <Route path="/dashboard/location/update/:id" element={<UpdateLocationModal/>}/>   
                <Route path="/dashboard/location/delete/:id" element={<DeleteLocationModal/>}/>    
            </Route>
        </Routes>
    )
}
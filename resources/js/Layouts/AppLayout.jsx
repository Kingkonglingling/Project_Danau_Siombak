import React from "react";
import { Head } from "@inertiajs/react";
import Navbar from "../Components/HomePageComponents/Navbar";
import Footer from "../Components/HomePageComponents/Footer";
import { Menu, MapPin } from "lucide-react";

export default function AppLayout({children, title = "Kampung Wisata Mutiara"}) {
    return (

        <>
        <Head title={title}/>

        <div className="min-h-screen bg-gray-50 font-sans antialiased">

        <Navbar Menu={Menu} />

            {children}

        <Footer MapPin={MapPin}/>
        
        </div>
        </>
    );
}
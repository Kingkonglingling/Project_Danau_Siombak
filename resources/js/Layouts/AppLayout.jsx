import React from "react";
import { Head } from "@inertiajs/react";
import Navbar from "../Components/HomePageComponents/Navbar";
import Footer from "../Components/HomePageComponents/Footer";
import { Menu, MapPin } from "lucide-react";

export default function AppLayout({
    children,
    title = "Kampung Wisata Mutiara",
}) {
    return (
        <>
            <Head title={title} />

            {/* bikin sticky footer: flex-col + main flex-1 */}
            <div className="min-h-screen bg-gray-50 font-sans antialiased flex flex-col">
                <Navbar Menu={Menu} />

                <main className="flex-1">{children}</main>

                <Footer MapPin={MapPin} />
            </div>
        </>
    );
}

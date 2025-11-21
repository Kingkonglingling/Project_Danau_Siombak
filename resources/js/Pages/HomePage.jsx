import {
    MapPin,
    Sailboat,
    Camera,
    Fish,
    Menu,
    Send,
    MessageCircle,
} from "lucide-react";
import { useEffect } from "react";
import { usePage } from "@inertiajs/react";

import HeroSection from "../Components/HomePageComponents/HeroSection";
import AboutSection from "@/Components/HomePageComponents/AboutSection";
import AttractionsSection from "@/Components/HomePageComponents/AttractionsSection";
import GallerySection from "@/Components/HomePageComponents/GallerySection";
import MapSection from "@/Components/HomePageComponents/MapSection";
import ChatBotSection from "@/Components/HomePageComponents/ChatBotSection";
import  AppLayout  from "@/Layouts/AppLayout";


// Main Application Component
export default function HomePage({ galleries, activities }) {
    const { url } = usePage();

    useEffect(() => {
        if (window.location.hash) {
            const id = window.location.hash.substring(1);
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 150);
            }
        }
    }, [url]);
    return (
        <>
        <AppLayout title="Beranda - Kampung Wisata Mutiara">
            {/* Hero Section */}
            <HeroSection />

            {/* About Section (Tentang Kampung Wisata Mutiara) */}
            <AboutSection MapPin={MapPin} />

            {/* Attractions Section (Aktivitas) */}
            <AttractionsSection
                Sailboat={Sailboat}
                Camera={Camera}
                Fish={Fish}
                activities={activities}
            />

            {/* Gallery Section */}
            <GallerySection  galleries={galleries} />

            {/* Map Section (Lokasi) & Call to Action Section (UPDATED) */}
            <MapSection />

            {/* Chatbot AI Section (NEW SECTION) */}
            <ChatBotSection MessageCircle={MessageCircle} Send={Send} />
            </AppLayout>
        </>
    );
}

import { MapPin, Sailboat, Camera, Fish, Menu, Send, MessageCircle } from 'lucide-react';
import { Head } from '@inertiajs/react';

import Navbar from '../Components/HomePageComponents/Navbar';
import HeroSection from '../Components/HomePageComponents/HeroSection';
import AboutSection from '@/Components/HomePageComponents/AboutSection';
import AttractionsSection from '@/Components/HomePageComponents/AttractionsSection';
import GallerySection from '@/Components/HomePageComponents/GallerySection';
import MapSection from '@/Components/HomePageComponents/MapSection';
import ChatBotSection from '@/Components/HomePageComponents/ChatBotSection';
import Footer from '@/Components/HomePageComponents/Footer';

// Main Application Component
export default function HomePage({ auth }) {
    
    return (
        <>
            {/* Title Placeholder (was <Head title="..."> from Inertia) */}
            <Head title="Wisata Danau Siombak" />
            {/* <title>Wisata Danau Siombak</title> */}
            <div className="min-h-screen bg-gray-50 font-sans antialiased">

                {/* Navbar */}
                <Navbar Sailboat={Sailboat} Menu={Menu} />
                

                {/* Hero Section */}
                <HeroSection />

                {/* About Section (Tentang Danau Siombak) */}
                <AboutSection MapPin={MapPin} />
                

                {/* Attractions Section (Aktivitas) */}
                <AttractionsSection Sailboat={Sailboat} Camera={Camera}  Fish={Fish} />
                

                {/* Gallery Section */}
                <GallerySection/>
               

                {/* Map Section (Lokasi) & Call to Action Section (UPDATED) */}
                <MapSection/>
                

                {/* Chatbot AI Section (NEW SECTION) */}
                <ChatBotSection  MessageCircle={MessageCircle} Send={Send}/>
                

                {/* Footer */}
                <Footer MapPin={MapPin} />
                
            </div>
        </>
    );
}
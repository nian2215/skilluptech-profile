export const dynamic = 'force-dynamic'

import Navbar         from '@/components/Navbar'
import HeroSection    from '@/components/HeroSection'
import AboutSection   from '@/components/AboutSection'
import ProjectsSection from '@/components/ProjectsSection'
import ServicesSection from '@/components/ServicesSection'
import TechSection    from '@/components/TechSection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030303] text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
      <TechSection />
      <ContactSection />
    </main>
  )
}

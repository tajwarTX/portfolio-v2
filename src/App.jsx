import Nav from './components/Nav';
import MatPrint from './components/MatPrint';
import { Caliper, ScrollRuler } from './components/Caliper';
import Hero from './sections/Hero';
import About from './sections/About';
import Builds from './sections/Builds';
import Archive from './sections/Archive';
import Awards from './sections/Awards';
import FieldNotes from './sections/FieldNotes';
import Contact from './sections/Contact';
import './styles/sections.css';

export default function App() {
  return (
    <>
      <a className="skip label-tape" href="#about">
        Skip to content
      </a>
      <Nav />
      <ScrollRuler />
      <Caliper />
      <main className="mat">
        <MatPrint />
        <Hero />
        <About />
        <Builds />
        <Archive />
        <Awards />
        <FieldNotes />
        <Contact />
      </main>
    </>
  );
}

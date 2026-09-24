import Header from "./components/Header";
import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import Capabilities from "./components/Capabilities";
import Integration from "./components/Integration";
import Security from "./components/Security";
import Compliance from "./components/Compliance";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-mist text-ink">
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-pine-900 px-5 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <TrustStrip />
        <Capabilities />
        <Integration />
        <Security />
        <Compliance />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

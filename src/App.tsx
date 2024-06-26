import Footer from "./components/Footer";
import Hero from "./components/Hero";
import EventDetails from "./components/EventDetails";
import ScrollProgress from "./components/ScrollProgress";
import MemeUpload from "./components/MemeUpload";

function App() {
  return (
    <main className="min-h-[100svh] no-scrollbar relative overflow-hidden ">
      <ScrollProgress />
      <Hero />
      <EventDetails />
      <MemeUpload />
      <Footer />
    </main>
  );
}

export default App;

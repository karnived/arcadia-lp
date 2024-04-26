import Background from "./components/Background";
import Countdown from "./components/Countdown";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import MemeUpload from "./components/MemeUpload";
import Roadmap from "./components/Roadmap";
import ScrollProgress from "./components/ScrollProgress";

function App() {
  return (
    <main className="min-h-[100svh] no-scrollbar relative overflow-hidden">
      <Background>
        <ScrollProgress />
        <Hero />
        <Countdown targetDate={"2024-05-24"} />
        <Roadmap />
        <MemeUpload />
        <Footer />
      </Background>
    </main>
  );
}

export default App;

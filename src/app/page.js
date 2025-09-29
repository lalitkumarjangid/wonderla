import Navbar from '../components/Navbar';
import RidesSection from '../components/RidesSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-800">
      <Navbar />
      <main>
        {/* Add other components here */}
        <RidesSection />
      </main>
    </div>
  );
}
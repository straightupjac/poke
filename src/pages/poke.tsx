import Navigation from "@components/navigation";
import { Poke } from "@components/poke";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Navigation />
      <div className="py-4">
        <Poke />
      </div>
    </main>
  );
}

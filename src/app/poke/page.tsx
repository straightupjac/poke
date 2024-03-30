import Navigation from "components/navigation";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Navigation />
      <div className="bg-gray-200 p-4 rounded-lg shadow-sm py-10">
        <h1 className="text-2xl font-bold mb-2">Poke</h1>
        <p className="text-gray-800">Poke your friends</p>
      </div>
    </main>
  );
}

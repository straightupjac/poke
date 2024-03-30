import Navigation from "@components/navigation";
import Image from "next/image";

export default function Leaderboard() {
  return (
    <main className="flex min-h-screen flex-col p-24 items-center">
      <Navigation />
      <div className="pt-4">
        <h2 className={`mb-3 text-2xl font-semibold`}>
          Leaderboard
        </h2>
      </div>

    </main>
  );
}

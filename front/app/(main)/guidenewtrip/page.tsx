import TripPlanForm from "./components/TripPlanForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container px-4 py-15 mx-auto md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 space-y-2 text-center">
            <h1 className="text-4xl font-bold text-transparent md:text-5xl bg-clip-text bg-sky-600">
              Create Your Adventure
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Plan your perfect trip with our interactive form and bring your
              travel dreams to life
            </p>
          </div>
          <TripPlanForm />
        </div>
      </div>
    </main>
  );
}

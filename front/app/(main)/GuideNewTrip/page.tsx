import TripPlanForm from "./components/Trip-plan-form";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      <div className="container px-4 py-10 mx-auto md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 space-y-2 text-center">
            <h1 className="text-4xl font-bold text-transparent md:text-5xl bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
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

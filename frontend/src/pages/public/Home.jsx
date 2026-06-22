/**
 * Home page — public portfolio.
 * Each section component will be imported and composed here in later steps.
 */
const Home = () => {
  return (
    <div>
      {/* Sections will be added here: Hero, About, Skills, Projects, Experience, Contact */}
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Hello, World! 👋
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400">
            Portfolio sections coming soon.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;

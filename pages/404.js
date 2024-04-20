import React from "react";

const Error404 = () => {
  return (
    <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn't find this page
          </p>
          <p className="mt-4 mb-8 dark:text-gray-400">
            But dont worry, you can find plenty of other things om our homepage
          </p>

          <a
            href="/"
            rel="noopener noreferrer"
            className="px-8 py-3 font-semibold rounded bg-[#705dfc] text-[#fff]"
          >
            Back to homepage
          </a>
        </div>
      </div>
    </section>
  );
};

export default Error404;

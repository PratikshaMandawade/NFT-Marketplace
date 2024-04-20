import React from "react";

//INTERNAL IMPORT
import { Banner, Action } from "../components/index";

const faq = () => {
  return (
    <div>
      <Banner
        name={
          <>
            Find your answer <br /> frequent ask question here
          </>
        }
        childStyles={"md:text-4xl sm:text-2xl xs:text-xl text-left"}
        parentStyle={
          "justify-start mb-7 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded"
        }
      />

      <div className="flex justify-center sm:px-4 p-12">
        <div className="w-3/5 md:w-full">
          <section className="dark:text-gray-100">
            <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
              <h2 className="text-2xl font-semibold sm:text-2xl">
                Frequestly Asked Questions
              </h2>
              <p className="mt-4 mb-8 dark:text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem
                ipsum dolor sit amet, consectetur adipisicing elit.
              </p>

              <div className="space-y-4">
                <details className="w-full border rounded-lg">
                  <summary className="px-4 py-6 focus:outline-none focus-visible:ri">
                    Lorem ipsum dolor sit amet consectetur?
                  </summary>
                  <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-400">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Laudantium odit iusto voluptates, nobis neque eaque rem
                    distinctio delectus cumque, expedita blanditiis sit?
                    Corrupti dolorem, incidunt consectetur animi laboriosam
                    aperiam vero!
                  </p>
                </details>
                <details className="w-full border rounded-lg">
                  <summary className="px-4 py-6 focus:outline-none focus-visible:ri">
                    Lorem ipsum dolor sit amet consectetur?
                  </summary>
                  <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-400">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Laudantium odit iusto voluptates, nobis neque eaque rem
                    distinctio delectus cumque, expedita blanditiis sit?
                    Corrupti dolorem, incidunt consectetur animi laboriosam
                    aperiam vero!
                  </p>
                </details>
                <details className="w-full border rounded-lg">
                  <summary className="px-4 py-6 focus:outline-none focus-visible:ri">
                    Lorem ipsum dolor sit amet consectetur?
                  </summary>
                  <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-400">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Laudantium odit iusto voluptates, nobis neque eaque rem
                    distinctio delectus cumque, expedita blanditiis sit?
                    Corrupti dolorem, incidunt consectetur animi laboriosam
                    aperiam vero!
                  </p>
                </details>
              </div>
            </div>
          </section>
          <Action />
        </div>
      </div>
    </div>
  );
};

export default faq;

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link"

const About = () => {
  return (
    <>
      {/* <!-- ===== About Start ===== --> */}
      <section className="overflow-hidden pb-20 lg:pb-25 xl:pb-30">
        <div className="mx-auto max-w-c-1235 px-4 md:px-8 xl:px-0">
          <div className="flex items-center gap-8 lg:gap-32.5">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left relative mx-auto hidden aspect-[1400/850] md:block md:w-1/2"
            >
              <Link target="_blank" href="https://elifeweb.vercel.app/">
              <Image 
                src="/images/about/elife-light.png"
                alt="About"
                className="dark:hidden"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
             
              <Image
                src="/images/about/elife-dark.png"
                alt="About"
                className="hidden dark:block"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
             </Link>
              
                     
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right md:w-1/2"
            >
              <span className="font-medium uppercase text-black dark:text-white">
                <span className="mb-4 mr-4 inline-flex rounded-full bg-meta px-4.5 py-1 text-metatitle uppercase text-white ">
                Custom Developed Website
                </span>{" "}
               
              </span>
              <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                IT & Cyberscurity Service Website
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark pl-5">
                  Revamp
                </span>
              </h2>
              <p>
              I specialize in website design, UX, and custom development, which I applied comprehensively to this website. By integrating aesthetic design with intuitive user experience principles and robust custom development, I ensured the site is visually appealing, highly functional, and user-friendly. 
              </p>

              <div className="mt-7.5 flex items-center gap-5">
                <div className="flex h-15 w-15 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                  <p className="text-metatitle2 font-semibold text-black dark:text-white">
                    01
                  </p>
                </div>
                <div className="w-3/4">
                  <h3 className="mb-0.5 text-metatitle2 text-black dark:text-white">
                   UI/UX Design 
                  </h3>
                  <p>I have done the research & UI/UX design </p>
                </div>
              </div>
              <div className="mt-7.5 flex items-center gap-5">
                <div className="flex h-15 w-15 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                  <p className="text-metatitle2 font-semibold text-black dark:text-white">
                    02
                  </p>
                </div>
                <div className="w-3/4">
                  <h3 className="mb-0.5 text-metatitle2 text-black dark:text-white">
                  React, Next.js 13 and TypeScript , Sanity
                  </h3>
                  <p>I have done front-End development & Backend</p>
                </div>
                
              </div>
              <a target="_blank"
                  href="https://elifeweb.vercel.app/"
                  className="group mt-7.5 inline-flex items-center gap-2.5 text-black hover:text-primary dark:text-white dark:hover:text-primary"
                >
                  <span className="duration-300 group-hover:pr-2">
                    Know More
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="currentColor"
                  >
                    <path d="M10.4767 6.16701L6.00668 1.69701L7.18501 0.518677L13.6667 7.00034L7.18501 13.482L6.00668 12.3037L10.4767 7.83368H0.333344V6.16701H10.4767Z" />
                  </svg>
                </a>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== About End ===== --> */}

      {/* <!-- ===== About Start ===== --> */}
      <section className="overflow-hidden pb-20 lg:pb-25 xl:pb-30">
        <div className="mx-auto max-w-c-1235 px-4 md:px-8 xl:px-0">
          <div className="flex items-center gap-8 lg:gap-32.5">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left relative mx-auto hidden aspect-[1400/850] md:block md:w-1/2"
            >
              <Link target="_blank" href="https://aicrowedmonitor.vercel.app/singlecam">
              <Image 
                src="/images/about/aicrowedmonitor.png"
                alt="About"
                className="dark:hidden"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
             
              <Image
                src="/images/about/aicrowedmonitor.png"
                alt="About"
                className="hidden dark:block"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
             </Link>
              
                     
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right md:w-1/2"
            >
              <span className="font-medium uppercase text-black dark:text-white">
                <span className="mb-4 mr-4 inline-flex rounded-full bg-meta px-4.5 py-1 text-metatitle uppercase text-white ">
                AI APPLICATION
                </span>{" "}
               
              </span>
              <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                CROWED MONITORING SYSTEM
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark pl-5">
                  AI
                </span>
              </h2>
              <p>
              I designed and developed this AI-powered Crowd Monitoring System to deliver intelligent, real-time crowd analysis for event and public space management. <br/>The system integrates advanced computer vision with a user-centric interface to accurately perform crowd counting and suspicious object identification, ensuring safety, efficiency, and rapid decision-making.
              (This Is Not a Full Version of the Project)
              </p>

        

              <div className="mt-7.5 flex items-center gap-5">
                <div className="flex h-15 w-15 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                  <p className="text-metatitle2 font-semibold text-black dark:text-white">
                    01
                  </p>
                </div>
                <div className="w-3/4">
                  <h3 className="mb-0.5 text-metatitle2 text-black dark:text-white">
                   UI/UX Design 
                  </h3>
                  <p>I have done the research & UI/UX design </p>
                </div>
              </div>
              <div className="mt-7.5 flex items-center gap-5">
                <div className="flex h-15 w-15 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                  <p className="text-metatitle2 font-semibold text-black dark:text-white">
                    02
                  </p>
                </div>
                <div className="w-3/4">
                  <h3 className="mb-0.5 text-metatitle2 text-black dark:text-white">
                  Clude AI, Python , Next.js
                  </h3>
                  <p>I have done front-End development & Backend</p>
                </div>
                
              </div>
              <a target="_blank"
                  href="https://aicrowedmonitor.vercel.app/singlecam"
                  className="group mt-7.5 inline-flex items-center gap-2.5 text-black hover:text-primary dark:text-white dark:hover:text-primary"
                >
                  <span className="duration-300 group-hover:pr-2">
                    Know More
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="currentColor"
                  >
                    <path d="M10.4767 6.16701L6.00668 1.69701L7.18501 0.518677L13.6667 7.00034L7.18501 13.482L6.00668 12.3037L10.4767 7.83368H0.333344V6.16701H10.4767Z" />
                  </svg>
                </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* <!-- ===== About Two Start ===== --> */}
      <section>
        <div className="mx-auto max-w-c-1235 overflow-hidden px-4 md:px-8 2xl:px-0">
          <div className="flex items-center gap-8 lg:gap-32.5">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left md:w-1/2"
            >    <span className="mb-4 mr-4 inline-flex rounded-full bg-meta px-4.5 py-1 text-metatitle uppercase text-white ">
              UI/UX Design
          </span>{" "}
              <h4 className="font-medium uppercase text-black dark:text-white">
              
              </h4>
              <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                Matrimonial <br/>Mobile App {"   "}
            
    
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg2 dark:before:bg-titlebgdark">
                  UI/UX 
                </span>
              </h2>
              <p>
              I designed this UI by blending the concepts of both dating and matrimonial platforms to create a unique and versatile hybrid experience. 
              </p>

              <div className="mt-7.5 flex items-center gap-5">
                <div className="flex h-15 w-15 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                  <p className="text-metatitle2 font-semibold text-black dark:text-white">
                    01
                  </p>
                </div>
                <div className="w-3/4">
                  <h3 className="mb-0.5 text-metatitle2 text-black dark:text-white">
                   UI/UX Design 
                  </h3>
                  <p>I have done the research & UI/UX design </p>
                </div>
              </div>
              <div>
                <a target="_blank" href="https://www.figma.com/design/owPEeqAbHnibUMTxhmGgcc/Ceylon-Matrimonial-App-V-0.1?node-id=152-3347&t=43OwqQZacMEIonP9-1"
                  className="group mt-7.5 inline-flex items-center gap-2.5 text-black hover:text-primary dark:text-white dark:hover:text-primary"
                >
                  <span className="duration-300 group-hover:pr-2">
                    Know More
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="currentColor"
                  >
                    <path d="M10.4767 6.16701L6.00668 1.69701L7.18501 0.518677L13.6667 7.00034L7.18501 13.482L6.00668 12.3037L10.4767 7.83368H0.333344V6.16701H10.4767Z" />
                  </svg>
                </a>
              </div>
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right relative mx-auto hidden aspect-[588/526.5] md:block md:w-1/2"
            > 
              <Image
                src="/images/about/Grid.svg"
                alt="About"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== About Two End ===== --> */}

      <section className="overflow-hidden pt-20 ">
        <div className="mx-auto max-w-c-1235 overflow-hidden px-4 md:px-8 2xl:px-0">
          <div className="flex items-center gap-8 lg:gap-32.5">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left md:w-1/2"
            >     
            <video className="w-full" controls src="/Demoanimationvideo.mp4"></video>
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right relative mx-auto hidden aspect-[588/526.5] md:block md:w-1/2"
            > 

<span className="mb-4 mr-4 inline-flex rounded-full bg-meta px-4.5 py-1 text-metatitle uppercase text-white ">
            Animation & Product Demo Video
          </span>{" "}
              <h4 className="font-medium uppercase text-black dark:text-white">
               
              </h4>
              <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                Sass Web Application<br/>Demo {"   "}
            
    
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg2 dark:before:bg-titlebgdark">
                  Video
                </span>
              </h2>
              <p>
              I have created this demo video for a Sass web application, utilizing animations to enhance the presentation and highlight the application's features. The video showcases the intuitive design, smooth interactions, and user-friendly experience, demonstrating how the application works in a visually engaging way. This approach helps in effectively communicating the value and functionality of the application to potential users and stakeholders.
              </p>
    
            </motion.div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden pt-20 ">
        <div className="mx-auto max-w-c-1235 overflow-hidden px-4 md:px-8 2xl:px-0">
          <div className="flex items-center gap-8 lg:gap-32.5">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left md:w-1/2"
            >     
              <div className="w-full" style={{ aspectRatio: '16/9' }}>
                <iframe 
                  style={{ border: '1px solid rgba(0, 0, 0, 0.1)', width: '100%', height: '100%' }} 
                  src="https://embed.figma.com/deck/LhYB3f8sphCQVnvnhdRy3K/Website-Revamp-UI-UX?node-id=16-4355&p=f&viewport=324%2C200%2C0.18&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&embed-host=share" 
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right relative mx-auto hidden aspect-[588/526.5] md:block md:w-1/2"
            > 
              <span className="mb-4 mr-4 inline-flex rounded-full bg-meta px-4.5 py-1 text-metatitle uppercase text-white ">
                UI/UX Design
              </span>{" "}
              <h4 className="font-medium uppercase text-black dark:text-white">
               
              </h4>
              <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                Website Revamp<br/>UI/UX {"   "}
            
    
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg2 dark:before:bg-titlebgdark">
                  Design
                </span>
              </h2>
              <p>
              I have created comprehensive UI/UX designs for a website revamp project, focusing on modern aesthetics, intuitive user experience, and seamless interactions. The design showcases a thoughtful approach to visual hierarchy, user flow, and responsive layouts that enhance usability and engagement.
              </p>
    
            </motion.div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-c-1235 overflow-hidden px-4 md:px-8 2xl:px-0">
          <div className="flex items-center gap-8 lg:gap-32.5">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left md:w-1/2"
            >    <span className="mb-4 mr-4 inline-flex rounded-full bg-meta px-4.5 py-1 text-metatitle uppercase text-white ">
             Socail Media Post Designs
          </span>{" "}
              <h4 className="font-medium uppercase text-black dark:text-white">
               
              </h4>
              <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                Socail Media Post{"   "}
            
    
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg2 dark:before:bg-titlebgdark">
                  Designs
                </span>
              </h2>
              <p>
              I designed these social media posts to engage and connect with the audience around the product. My goal was to create visually appealing content that highlights the product's features and encourages interaction.
              </p>
              <div>
                <a target="_blank" href="https://elife-web.elifeamerica.com/tbt"
                  className="group mt-7.5 inline-flex items-center gap-2.5 text-black hover:text-primary dark:text-white dark:hover:text-primary"
                >
                  <span className="duration-300 group-hover:pr-2">
                    Know More
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="currentColor"
                  >
                    <path d="M10.4767 6.16701L6.00668 1.69701L7.18501 0.518677L13.6667 7.00034L7.18501 13.482L6.00668 12.3037L10.4767 7.83368H0.333344V6.16701H10.4767Z" />
                  </svg>
                </a>
              </div>
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right relative mx-auto hidden aspect-[588/526.5] md:block md:w-1/2"
            > 
              <Image
                src="/images/about/Post.svg"
                alt="About"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            
            </motion.div>
          </div>
        </div>
      </section>

      
    </>
  );
};

export default About;

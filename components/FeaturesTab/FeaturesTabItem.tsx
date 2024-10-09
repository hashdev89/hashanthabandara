import React from "react";
import { FeatureTab } from "@/types/featureTab";
import Image from "next/image";
import { motion } from "framer-motion";

const FeaturesTabItem = ({ featureTab }: { featureTab: FeatureTab }) => {
  const { title, desc1, image, imageDark, link } = featureTab;

  return (
    <>
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
              viewport={{ once: false }}
              className="animate"
            >
      <div className="flex items-center gap-8 lg:gap-19">
        
        <div className="md:w-1/2">
        <span className="mb-4 mr-4 inline-flex rounded-full bg-meta px-4.5 py-1 text-metatitle uppercase text-white ">
            New
          </span>{" "}
              <h4 className="font-medium uppercase text-black dark:text-white pb-4">
               Ecommerce Website UI/UX Design
              </h4>
          <h2 className="mb-7 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle2">
            {title}
          </h2>
          <p className="mb-5">{desc1}</p>
          
        </div>
        <div className="relative mx-auto hidden aspect-[1400/850] max-w-[850px] md:block md:w-1/2">
        <a target="_blank" href={featureTab.link}>
          <Image src={image} alt={title} fill className="dark:hidden" />
          <Image
            src={imageDark}
            alt={title}
            fill
            className="hidden dark:block"
          />
          </a>
        </div>
      </div>
      </motion.div>
    </>
  );
};

export default FeaturesTabItem;

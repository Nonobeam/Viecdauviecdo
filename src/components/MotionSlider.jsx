import React from "react";
import PropTypes from 'prop-types';
import { PinContainer } from "@/components/ui/3d-pin";
import { Badge } from "@/components/ui/badge";

export default function AnimatedPinDemo({ title, info, link, imgSrc, jobList }) {
  console.log("link" + imgSrc);
  return (
    <div className="h-[25rem] w-full flex items-center justify-center">
      <PinContainer title={title} href={link}>
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[25rem] bg-white">
          {/* company name */}
          <h3 className="max-w-xs !pb-2 !m-0 font-bold text-3xl text-center text-black mb-2">
            {title}
          </h3>
          {/* company logo */}
          <img
            src={imgSrc}
            alt="Project"
            className="h-32 w-full object-cover rounded-md mb-6"
          />
          {/* company info */}
          <div className="space-y-2 mb-4">
            {info.map((item, index) => (
              <p key={index} className="text-sm text-muted-foreground">
                {item}
              </p>
            ))}
          </div>
          {/* job list */}
          <div className="flex flex-col flex-wrap gap-x-2 gap-y-2 mt-2">
            {jobList.map((job, index) => (
              <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700 px-3 py-1">
                {job}
              </Badge>
            ))}
          </div>
        </div>
      </PinContainer>
    </div>
  );
};

AnimatedPinDemo.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.arrayOf(PropTypes.string).isRequired,
  link: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  jobList: PropTypes.arrayOf(PropTypes.string).isRequired,
};
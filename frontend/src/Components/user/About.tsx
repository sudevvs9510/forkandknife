import React from "react";
import img from "../../assets/images/about.jpg";
import Button from "../../layouts/Buttons";

const About: React.FC =  () => {
  return (
    <div className="flex flex-col sm:flex-row  lg:flex-row  justify-center items-center lg:px-32 px-5">
      <div className="flex justify-center items-center mr-4">
      <img className="max-w-full max-h-full" src={img} alt="img" />
      </div>
      

      <div className=" space-y-4 lg:pt-14">
        <h1 className=" font-semibold text-4xl text-center md:text-start">
          Why Choose Us?
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          architecto quisquam delectus minima perferendis nulla quia nisi
          laborum, exercitationem cum quo accusantium, impedit sed. Dicta, quo
          molestias omnis reprehenderit quae animi? Explicabo quasi accusamus
          laboriosam temporibus delectus, aut a? Quasi?
        </p>
        {/* <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi,
          suscipit reiciendis accusamus recusandae eum aspernatur pariatur odit
          veritatis facere. Magnam!
        </p> */}
        <div className=" flex justify-center lg:justify-start">
          <Button title="Learn More" />
        </div>
      </div>
    </div>
  );
};

export default About;
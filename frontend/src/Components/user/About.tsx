import React from "react";
import img from "../../assets/images/about.jpg";
// import Button from "../../layouts/Buttons";

const About: React.FC = () => {
  return (
    <div
      id="About"
      className="flex flex-col sm:flex-row lg:flex-row justify-center items-center lg:px-32 px-5"
    >
      {/* Image Section */}
      <div className="flex justify-center items-center lg:w-2/5 w-full mr-4">
        <img className="max-w-full max-h-full" src={img} alt="About Us" />
      </div>

      {/* Content Section */}
      <div className="lg:w-3/5 w-full space-y-4 lg:pt-14">
        <h1 className="font-semibold text-4xl text-center md:text-start">
          Why Choose Us?
        </h1>
        <p>
          At Fork & Knife, we believe dining should be an experience, not just a
          meal. Our platform simplifies the process of reserving a table,
          ensuring you never have to worry about last-minute hassles. Whether
          it’s a casual brunch, a romantic dinner, or a celebratory feast, our
          user-friendly interface allows you to explore and book the perfect
          spot with ease. We partner with top-rated restaurants to offer you a
          diverse selection of cuisines, tailored to every occasion and
          preference. With real-time availability, secure reservations, and
          personalized recommendations, Fork & Knife is designed to make dining
          out a seamless and delightful journey. Your satisfaction is our
          priority, and we’re committed to elevating the way you dine. Choose
          us for convenience, reliability, and a dining experience worth
          remembering!
        </p>
        {/* <div className="flex justify-center lg:justify-start">
          <Button title="Learn More" />
        </div> */}
      </div>
    </div>
  );
};

export default About;

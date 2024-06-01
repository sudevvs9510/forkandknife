import React from "react";

interface Button {
   title: string
}

const Button:React.FC<Button> = (props) => {
  return (
    <div>
      <button className=" px-6 py-1 bg-[#00CCB8] text-brightColor hover:bg-brightColor hover:text-white transition-all rounded-lg">
        {props.title}
      </button>
    </div>
  );
};

export default Button;
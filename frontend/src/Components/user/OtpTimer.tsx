import React, { useEffect, useState } from 'react';
import { getStorageItem } from '../../util/localStorage';
import { resendOtp } from '../../api/api';

const OtpTimer: React.FC = () => {

  const [seconds, setSeconds] = useState(() => {
    const savedSeconds = localStorage.getItem("remainingSeconds");
    return savedSeconds ? parseInt(savedSeconds, 10) : 30;
  });

  useEffect(() => {
    const interval = setInterval(() => {
        if (seconds > 0) {
         setSeconds((seconds)=>{
            localStorage.setItem("remainingSeconds", String(seconds -1));
            return seconds -1;
         })
      }
        },1000);
    return () => clearInterval(interval);
  }, [seconds]);

  const resendOtpFunc = () => {
    setSeconds(30);
    localStorage.setItem("remainingSeconds", "30");
    const userId = getStorageItem("Email");
      resendOtp(userId as string);
  };

  return (
    <div>
      <div className='relative pt-3 '>
        {seconds > 0 ? (
          <p>Time remaining: <span className='font-semibold'>
            {" "}
            00: {seconds < 10 ? `0${seconds}` : seconds}
            </span>
            </p>
        ) : (
          <span>Didn't receive the OTP?  </span>
        )}
        <button
          className=''
          disabled={seconds > 0}
          onClick={resendOtpFunc}
          style={{ color: seconds > 0 ? "#DFE3E8" : "#008376" }}
         
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default OtpTimer;


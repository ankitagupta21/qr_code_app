import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

function Login() {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const history = useNavigate();

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
            console.log("expired");
          },
        }
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        console.log(confirmationResult);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onVerifyOTP() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
        history("/home", { state: { id: ph } });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  return (
    <div>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div id="recaptcha-container"></div>
      {!user ? (
        <div className="head">
          <h1 className="heading1">Welcome!!</h1>
          {showOTP ? (
            <>
              <div className="lock">
                <BsFillShieldLockFill size={30} />
              </div>
              <label htmlFor="otp" className="label">
                Enter your OTP
              </label>
              <OtpInput
                value={otp}
                onChange={setOtp}
                OTPLength={6}
                otpType="number"
                disabled={false}
                className="otp-container "
                autoFocus={true}
              ></OtpInput>
              <button onClick={onVerifyOTP} className="button">
                {loading && <CgSpinner size={20} className="spinner" />}
                <span>Verify OTP</span>
              </button>
            </>
          ) : (
            <>
              <div className="lock">
                <BsTelephoneFill size={30} />
              </div>
              <label htmlFor="" className="label">
                Verify your phone number
              </label>
              <PhoneInput country={"in"} value={ph} onChange={setPh} />
              <button onClick={onSignup} className="button">
                {loading && <CgSpinner size={20} className="spinner" />}
                <span>Send code via SMS</span>
              </button>
            </>
          )}
        </div>
      ) : (
        <h2 className="heading2">👍 Login Success</h2>
      )}
    </div>
  );
}

export default Login;

"use client";
import {useState} from "react";
import { signInWithPhoneNumber, RecaptchaVerifier, ConfirmationResult} from "firebase/auth";


export default function Login() {

    const [phone_number, setNumber] = useState('');

    const [otp, setOtp] = useState('');
    const [otp_send, setOtpSend] = useState(false);


    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
    // write a method call when submit button is clicked
    const onSubmit = (event: any) => {
        event.preventDefault();
        // console.log(phone_number, otp, otp_send);
        if (phone_number != "" && !otp_send) {
            // @ts-ignore
            // const appVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
            //     'size': 'invisible',
            //     'callback': (response: any) => {
            //         console.log(response);
            //     }
            // });
            // signInWithPhoneNumber(auth, phone_number, appVerifier)
            //     .then((result) => {
            //         setOtpSend(true);
            //         setConfirmationResult(result);
            //         console.log(phone_number, otp, confirmationResult);
            //         // ...
            //     }).catch((error) => {
            //         console.log(error);
            //     // Error; SMS not sent
            //     // ...
            // });
        }
    }

    const verifyOtp = (event: any) => {
        event.preventDefault();
        if (otp != "" && otp_send) {
            confirmationResult?.confirm(otp).then((result) => {
                console.log(result);
            }).catch((error) => {
                console.log(error);
            });
        }
    }


    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold mb-4">Login</h1>
                    <form className="w-full" onSubmit={onSubmit}>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="mobile" className="text-sm font-semibold mb-2">Phone Number</label>
                            <input type="mobile" id="mobile" value={phone_number}
                                   onChange={e => setNumber(e.currentTarget.value)}
                                   className="py-2 px-3 border border-gray-300 rounded-md"/>
                        </div>
                        <button type="submit" id="sign-in-button"
                                className={!otp_send ? "bg-black text-white py-2 rounded-md" : "bg-black text-white py-2 rounded-md hidden"}>Login
                        </button>
                    </form>
                    <form className={otp_send ? "w-full": "w-full hidden"} onSubmit={verifyOtp}>
                        <div className="flex flex-col mb-4">
                            <label
                                htmlFor="otp" className="text-sm font-semibold mb-2">OTP</label>
                            <input type="number" id="otp" value={otp} onChange={e => setOtp(e.currentTarget.value)}
                                   className="py-2 px-3 border border-gray-300 rounded-md "/>
                        </div>
                        <button type="submit"
                                className="bg-black text-white py-2 rounded-md">Verify
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
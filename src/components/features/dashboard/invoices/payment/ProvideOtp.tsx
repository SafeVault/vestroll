import InvoiceOtpInput from "./InvoiceOtpInput";

const ProvideOtp = () => {
  return (
    <>
      <div className="text-center max-w-3/4 w-full mx-auto">
        <h3 className="font-semibold text-xl lg:font-bold lg:text-3xl text-gray-500 mb-4 lg:mb-2">
          Provide OTP
        </h3>

        <p
          className="text-xs font-medium text-gray-400 
        "
        >
          Authorize transaction with the{" "}
          <span className="text-gray-500">OTP</span> sent to
          your email address to complete process
        </p>
      </div>

      <div>
        <InvoiceOtpInput />
      </div>
    </>
  );
};

export default ProvideOtp;

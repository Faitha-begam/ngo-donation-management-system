import AuthBanner from "./AuthBanner";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F8F4] via-[#EEF2EA] to-[#E4EBDD] flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        
        {/* Left Side */}
        <AuthBanner />

        {/* Right Side */}
        <div className="flex items-center justify-center p-8 lg:p-14">
          <div className="w-full max-w-md">

            <div className="mb-8">
              <h1 className="text-4xl font-bold text-[#2E3A27]">
                {title}
              </h1>

              <p className="text-gray-500 mt-3 leading-relaxed">
                {subtitle}
              </p>
            </div>

            {children}

          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;
import Footer from "../components/footer";
import Header from "../components/header";

function Page() {
  return (
    <div className="w-full max-w-[1440px] mx-auto">
      {/* Header */}
      <Header />

      <div>
        <h1 className="pt-[132px] text-3xl font-bold font-Clash text-center mt-11 text-gray-800">
          Contact Form:
        </h1>

        <div className="w-[90%] sm:w-[75%] md:w-[70%] lg:w-[50%] mx-auto my-9 border border-gray-300 rounded-lg shadow-lg shadow-gray-400 px-6 sm:px-12 py-12 bg-white">
          <form className="flex flex-col w-full gap-4">
            {/* Name Field */}
            <label htmlFor="Name" className="text-gray-700 font-medium">
              Name:
              <input
                type="text"
                id="Name"
                placeholder="Enter your name"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </label>

            {/* Address Field */}
            <label htmlFor="Address" className="text-gray-700 font-medium">
              Address:
              <input
                type="text"
                id="Address"
                placeholder="Enter your address"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </label>

            {/* Email Field */}
            <label htmlFor="Email" className="text-gray-700 font-medium">
              Email:
              <input
                type="email"
                id="Email"
                placeholder="Enter your email"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-6 w-full bg-[#342f58] text-white py-2 rounded-md font-semibold hover:bg-[#47426b] transition-all"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Page;

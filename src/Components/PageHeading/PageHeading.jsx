const PageHeading = ({ title, subtitle }) => {
    return (
      <div className=" bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 py-10 text-center text-black">
        <h1 className="md:text-4xl text-xl font-bold mb-2">{title}</h1>
        <p className="md:text-lg text-[12px]">{subtitle}</p>
      </div>
    // <div className="bg-gradient-to-r from-teal-500 via-[#006666] to-navy py-10 text-center text-white">
    //   <h1 className="text-5xl font-extrabold mb-3">{title}</h1>
    //   <p className="text-xl">{subtitle}</p>
    // </div>
    );
  };
  
  export default PageHeading;
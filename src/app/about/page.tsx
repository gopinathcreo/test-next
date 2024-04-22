import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - zoozle.in",
  description:
    "Learn more about Zoozle.in - your ultimate destination for online shopping. Discover our mission, values, and commitment to providing exceptional service and quality products.",
};
function aboutUs() {
  return (
    <div className="container mt-5 md:px-0 px-3">
      <div className="text-justify">
        <div className="">
          <div className="md:mb-5 py-8">
            <h1 className="md:text-5xl text-4xl font-bold md:py-4 text-center">About Us</h1>
            <p className="py-3 text-sm">
              Zoozle is an e-commerce enabler, which provides a technology
              platform to sellers to list their products. Along with this,
              zoozle also helps sellers to create demand for their products
              through its Zoozle Entrepreneur Network (ZEN) Program.
            </p>
            <p className="py-3 text-sm">
              “Zoozle Entrepreneur network” (ZEN) members are white labelled
              digital entrepreneurs.In short, Zoozle will create a distribution
              mechanism of 2 million touch points for sellers on zoozle.
            </p>
            <p className="py-3 text-sm">
              These Entrepreneurs gets a ready made online business with
              thousands of SKUs to sell and profit from.
            </p>
            <p className="py-3 text-sm">
              Zoozle also focus on nurturing these entrepreneurs with regular
              educational intervention to help them grow their trade
            </p>
            <p className="pt-3 text-sm">
              Each of these digital entrepreneurs will be provided a
              personalized platform to market and sell all products listed on
              zoozle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default aboutUs;

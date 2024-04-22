"use client";
import {
  Collapse,
  Button,
  Card,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import Link from "next/link";
import React from "react";

function Faq() {
  const [openGetStarted, setOpenGetStarted] = React.useState(false);
  const toggleOpenGetStarted = () => setOpenGetStarted((cur) => !cur);
  const [openSellerCentral, setOpenSellerCentral] = React.useState(false);
  const toggleOpenSellerCentral = () => setOpenSellerCentral((cur) => !cur);
  const [openBuyerCentral, setOpenBuyerCentral] = React.useState(false);
  const toggleOpenBuyerCentral = () => setOpenBuyerCentral((cur) => !cur);
  const [openZoozleFaqs, setOpenZoozleFaqs] = React.useState(false);
  const toggleOpenZoozleFaqs = () => setOpenZoozleFaqs((cur) => !cur);
  const [openZenFaqs, setOpenZenFaqs] = React.useState(false);
  const toggleOpenZenFaqs = () => setOpenZenFaqs((cur) => !cur);

  return (
    <div>
      <div className="container my-5 md:px-20 px-2 ">
        <h1 className="flex justify-center md:text-[56px] text-[24px] font-bold py-6 ">
          Frequently Asked Questions
        </h1>
        <div className="shadow-md">
          <div
            onClick={toggleOpenGetStarted}
            className="flex justify-between ring-1 ring-gray-600 ring-opacity-5 px-4 py-4"
          >
            <h1 className="text-[14px] font-semibold"> Getting started </h1>
            <img
              src="/svg/footer_arrow.svg"
              alt="Arrow button"
              width={20}
              height={20}
              className="rotate-0 transform transition-all duration-300 "
            ></img>
          </div>
          <Collapse open={openGetStarted}>
            <div className="text-justify py-2">
              <ol className="list-decimal md:px-12 px-5 space-y-3">
                <li data-list-text="1.">
                  <h4 className="font-semibold">What is Zoozle?</h4>

                  <p>
                    Zoozle is an E-commerce platform. Businesses sell their
                    products to millions of buyers across India, at really low
                    commission rates.
                  </p>
                  <p>There are 4 business streams on Zoozle.</p>
                  <h4 className="font-bold space-y-2 py-3">
                    <span className="p">a. Zoozle B2B </span>
                    <br />
                    <span className="p">b. Zoozle Ecommerce </span> <br />
                    <span className="p">c. Zoozle Shops</span> <br />
                    <span className="p">d. Zoozle Entrepreneur Program</span>
                  </h4>
                  <div className="space-y-3">
                    <h4 className="font-semibold">a.What is Zoozle B2B?</h4>
                    <p>
                      Any GST enabled Manufacturer, Distributors, Suppliers etc
                      can register on Zoozle and sell their products to
                      retailers who are listed on our platform, this stream is
                      only for wholesale transactions.
                    </p>
                    <h4 className="font-semibold">
                      b. What is Zoozle Ecommerce?
                    </h4>
                    <p>
                      Market place model where any GST enabled business owner
                      can register and sell on Zoozle. Zoozle charges a
                      commission on sales, which differs from category to
                      category. (Commission charged is lower than other
                      e-commerce platforms).This platform is available on the
                      Web and App.
                    </p>
                    <h4 className="font-semibold">c.What are Zoozle Shops?</h4>
                    <p>
                      Enables traditional businesses to set up their online
                      stores, fully enabled logistics, payments, analytics and
                      assisted catalog service.
                    </p>
                    <h4 className="font-semibold">
                      d.What is Zoozle Entrepreneur Program?
                    </h4>
                    <p>
                      Empowering any individual to set up their own e-commerce
                      platform as a business. This white-labelled solution with
                      complete set-up assistance helps in operating and managing
                      a profitable venture.
                    </p>
                  </div>
                  <div className="space-y-2 my-2">
                    <p>All you need to have is:</p>
                    <p>Pan card Aadhar</p>
                    <p>Bank account</p>
                    <p>Form 16 or tax returns</p>
                    <p>Family member tax returns as an alternate</p>
                  </div>
                </li>
                <li data-list-text="2.">
                  <h4 className="font-semibold">Why Zoozle?</h4>
                  <ol className="list-decimal md:px-14 px-2 space-y-2 ">
                    <li data-list-text="1.">
                      <p>Buy products at the lowest online prices</p>
                    </li>
                    <li data-list-text="2.">
                      <p>Sell products at the lowest commission rates</p>
                    </li>
                    <li data-list-text="3.">
                      <p>Generate sales on demand</p>
                    </li>
                    <li data-list-text="4.">
                      <p>No registration fee</p>
                    </li>
                    <li data-list-text="5.">
                      <p>
                        Convert your offline business to online e-commerce
                        enabled venture
                      </p>
                    </li>
                  </ol>
                </li>
                <li>
                  <h4 className="font-semibold">
                    What about the quality of products?
                  </h4>
                  <p>
                    Zoozle only sells brand new products, we do not allow
                    refurbished or repackaged products.
                  </p>
                </li>
              </ol>
            </div>
          </Collapse>

          <div
            onClick={toggleOpenSellerCentral}
            className="flex justify-between py-4 ring-1 ring-gray-600 ring-opacity-15 px-4"
          >
            <h1 className="text-[14px] font-semibold"> Seller Central FAQs </h1>{" "}
            <img
              src="/svg/footer_arrow.svg"
              alt="Arrow button"
              width={20}
              height={20}
              className="rotate-0 transform transition-all duration-300 "
            ></img>
          </div>
          <Collapse open={openSellerCentral}>
            <div className="md:px-10 px-3 py-4">
              <ol className="list-decimal md:px-12 pl-2 marker:font-bold space-y-2 text-justify">
                <li data-list-text="1.">
                  <h2 className="font-bold">Onboarding</h2>
                  <ol className="list-disc space-y-2 md:px-5 pl-2" id="l4">
                    <li data-list-text="1.">
                      <h4 className="font-bold">Is onboarding free?</h4>
                      <p>YES! Onboarding is absolutely free.</p>
                    </li>
                    <li data-list-text="2.">
                      <h4 className="font-bold">How do I onboard?</h4>
                      <p>
                        Open Playstore/Appstore &gt; Search Zoozle &gt; Download
                        &gt; Add your Business mobile Number and GST &gt; Fill
                        in Business Owner Details &gt;Choose your Category of
                      </p>
                      <p>Business&gt; Successfully Onboarded</p>
                    </li>
                    <li data-list-text="3.">
                      <h4 className="font-bold">
                        What documents do I require to onboard?
                      </h4>
                    </li>
                  </ol>
                </li>
                <p>
                  Download Zoozle App and onboard using your business contact
                  number and GST number (Goods and Service Tax Number)
                </p>
                <li data-list-text="●">
                  <h2 className="font-bold">Broadcasting</h2>
                  <ol className="list-decimal md:px-3 px-1 marker:font-bold space-y-3">
                    <li data-list-text="1.">
                      <h4 className="font-semibold">
                        What is broadcasting? How do I broadcast?
                      </h4>
                      <p>
                        Using this feature businesses can send their deals to
                        their choice of customers by notifications on the Zoozle
                        app and WhatsApp. You can use Zoozle coins earned on
                        every transaction to broadcast your product or pay Rs 2
                        per notification.
                      </p>
                    </li>
                    <li data-list-text="2.">
                      <h4 className="font-semibold">
                        What is a &quot;deal&quot;? How is it created?
                      </h4>
                      <p>
                        A &quot;deal&quot; is a limited time offer, offered by
                        Zoozle registered sellers where the price of a product
                        is always lower than other online platforms.
                      </p>
                    </li>
                    <li className="font-semibold space-y-2 md:px-4 px-2">
                      <h4 className="font-semibold">
                        What are the steps for broadcasting a product?
                      </h4>
                      <h4>
                        Step 1<span className="p">: Choose a product</span>
                      </h4>
                      <h4>
                        Step 2
                        <span className="p">
                          : Fix the best offer price compared to other
                          e-commerce platforms ( The offer price should be
                          lesser than other online platforms)
                        </span>
                      </h4>
                      <h4>
                        Step 3:{" "}
                        <span className="p">Choose your target customers</span>
                      </h4>
                      <h4>
                        Step 4:
                        <span className="p">
                          Use Zoozle coins earned to broadcast your product or
                          pay Rs 2 per notification to broadcast.
                        </span>
                      </h4>
                      <h4>
                        Step 5:{" "}
                        <span className="p">
                          Our Zoozle team will verify and approve your deal
                        </span>
                      </h4>
                      <h4>
                        Step 6:
                        <span className="p">
                          If any of these criteria are not fulfilled our team
                          will connect and assist.
                        </span>
                      </h4>
                    </li>
                    <li data-list-text="4.">
                      <h4 className="font-semibold">
                        What is the meaning of &quot;best offer price&quot;?
                      </h4>
                      <p>
                        Best offer price refers to the price lesser than other
                        online platforms.
                      </p>
                    </li>
                    <li data-list-text="5.">
                      <h4 className="font-semibold">
                        What is a Zoozle Coin? How do I earn them?
                      </h4>
                      <p>
                        Any Zoozle registered customer who purchases any product
                        through Zoozle gets coins, which he can redeem only to
                        broadcast his/her product. Rs 50 is equivalent to 1
                        Zoozle coin. Ex – If the purchase value is Rs 100, 2
                        Zoozle coins will get credited to the buyer&apos;s
                        account, which can be redeemed to broadcast their
                        products.
                      </p>
                    </li>
                    <li data-list-text="6.">
                      <h4 className="font-semibold">
                        How many products can I broadcast at once?
                      </h4>
                      <p>
                        You can broadcast any number of products individually.
                      </p>
                    </li>
                    <li data-list-text="7.">
                      <h4 className="font-semibold">
                        When will I know my product is broadcasted?
                      </h4>
                      <p>
                        You will be notified once your product is broadcasted.
                      </p>
                    </li>
                  </ol>
                </li>
                <li data-list-text="●">
                  <h2 className="font-bold">Payment</h2>
                  <ol className="list-decimal space-y-2 px-4">
                    <li data-list-text="1.">
                      <h4 className="font-semibold">When will I be paid?</h4>
                      <p>
                        The amount will be settled for you within 7 working days
                        from the date of delivery of the product.
                      </p>
                    </li>
                    <li data-list-text="2.">
                      <h4 className="font-semibold">
                        How does Zoozle transfer payments?
                      </h4>
                      <p>
                        We transfer the money to the seller&apos;s{" "}
                        <b>virtual bank account</b>. The seller can transfer
                        this money to his linked bank account which should be
                        his company’s bank account as per GST.
                      </p>
                    </li>
                    <li data-list-text="3.">
                      <h4 className="font-semibold">
                        What is a Zoozle Virtual Account?
                      </h4>
                      <p>
                        Zoozle Virtual Account is a unique generated account
                        number that gets created immediately after the seller
                        onboards. This account helps the seller to transact.
                      </p>
                    </li>
                  </ol>
                </li>
                <li data-list-text="●">
                  <h3 className="font-bold">Manage Shipment</h3>
                  <ol className="list-decimal px-4 space-y-2">
                    <li data-list-text="1.">
                      <h4 className="font-semibold">
                        On what basis shipment charges are calculated?
                      </h4>
                      <p>
                        Shipment Charges are calculated based on the type,
                        dimension, weight of the product along with the
                        location.
                      </p>
                    </li>
                    <li data-list-text="2.">
                      <h4 className="font-semibold">How to track my order?</h4>
                      <p>
                        As soon as the shipment details are created, you will be
                        able to track your shipment on the Zoozle app - Account.
                      </p>
                    </li>
                    <li data-list-text="3.">
                      <h4>Do you ship outside India?</h4>
                      <p>Currently, we do not operate outside India.</p>
                    </li>
                    <li data-list-text="4.">
                      <h4 className="font-semibold">
                        How is the shipping rate calculated?
                      </h4>
                      <p>
                        The shipping rate is calculated based on the volumetric
                        weight or Total weight of the product along with the
                        distance.
                      </p>
                    </li>
                  </ol>
                </li>
                <li data-list-text="●">
                  <h3 className="font-bold">Return and Exchange</h3>
                  <ol className="list-decimal px-4 space-y-2">
                    <li data-list-text="1.">
                      <h4>What is Zoozle’s Return policy?</h4>
                      <p>
                        The returns will be accepted from the customer only if
                        the product is damaged; or if there is a defect in the
                        product.
                      </p>
                    </li>
                    <li data-list-text="2.">
                      <h4>
                        Will I be charged if the buyer cancels the order post
                        shipment?
                      </h4>
                      <p>
                        The Zoozle team will investigate the reason for the
                        cancellation and will process the refund as per return
                        policies.
                      </p>
                    </li>
                  </ol>
                </li>
              </ol>

              <ol id="l5"></ol>
            </div>
          </Collapse>

          <div
            onClick={toggleOpenBuyerCentral}
            className="flex justify-between  py-4 ring-1 ring-black ring-opacity-15 px-4"
          >
            <h1 className="text-[14px] font-semibold"> Buyer Central FAQs </h1>
            <img
              src="/svg/footer_arrow.svg"
              alt="Arrow button"
              width={20}
              height={20}
              className="rotate-0 transform transition-all duration-300 "
            ></img>
          </div>
          <Collapse open={openBuyerCentral}>
            <div className="card-body p-0 py-4 text-justify">
              <ol className="list-decimal md:pl-12 pl-6 marker:font-bold space-y-4 py-2">
                <li data-list-text="1.">
                  <h4 className="font-semibold">
                    Is it mandatory to be a registered seller to purchase?
                  </h4>
                  <p>
                    No, It is not. Anyone in India can buy anything on Zoozle.
                  </p>
                  <ol className="list-decimal pl-4 pr-2 space-y-4 py-2">
                    <li data-list-text="a.">
                      <h4 className="font-semibold">
                        How do I place an order if I am a GST registered
                        Business Owner?
                      </h4>
                      <p>
                        Open Zoozle App &gt; Choose your category &gt; Choose
                        your product &gt; Click Buy Now &gt;
                      </p>
                      <p>
                        Select Delivery Address &gt; Choose Your Payment Type
                        &gt; Checkout
                      </p>
                    </li>
                    <li data-list-text="b.">
                      <h4 className="font-semibold">
                        What is an &quot;add user&quot; and How to place an
                        order if you are an added user by a GST registered
                        Business Owner?
                      </h4>
                      <p>
                        &quot;Add user&quot; is a feature where the registered
                        Business owner can add users like friends or family
                        members to help them purchase products on Zoozle. This
                        enables the business owner to accumulate Zoozle coins,
                        which in turn helps to get more sales for the business
                        owner.
                      </p>
                      <p>
                        Open Zoozle App &gt; Choose your category &gt; Choose
                        your product &gt; Click Buy Now &gt;
                      </p>
                      <p>
                        Select Delivery Address &gt; Choose Your Payment Type
                        &gt; Checkout
                      </p>
                    </li>
                    <li data-list-text="c.">
                      <h4>
                        How to place an order if I am not a GST registered
                        customer or not added as a user?
                      </h4>
                      <p>
                        You can still purchase from Zoozle even if you are not a
                        GST registered customer or not an added user, through
                        the Zoozle website https://zoozle.in
                      </p>
                    </li>
                  </ol>
                </li>
                <li data-list-text="2.">
                  <h4 className="font-semibold">
                    What are the different modes of payment?
                  </h4>
                  <ul className="list-disc px-4 space-y-2">
                    <li data-list-text="●">
                      <p>Zoozle Virtual Account/ Zoozle Balance</p>
                    </li>
                    <li data-list-text="●">
                      <p>UPI</p>
                    </li>
                    <li data-list-text="●">
                      <p>Debit/Credit Card</p>
                    </li>
                    <li data-list-text="●">
                      <p>Cash on Delivery in some cases</p>
                    </li>
                  </ul>
                </li>
                <li data-list-text="3.">
                  <h4 className="font-semibold">
                    Are the products sold refurbished/Second Hand?
                  </h4>
                  <p>
                    Zoozle only sells brand new products, we do not allow
                    refurbished or repackaged products.
                  </p>
                </li>
                <li data-list-text="4.">
                  <h4 className="font-semibold">
                    I am not able to track the order.
                  </h4>
                  <p>
                    <a href="mailto:letstalk@zoozle.in" target="_blank">
                      You can contact us through chat support or reach us out at
                    </a>
                    <a
                      className="link-sm link-secondary"
                      href="mailto:letstalk@zoozle.in"
                    >
                      letstalk@zoozle.in
                    </a>
                  </p>
                </li>
                <li data-list-text="5.">
                  <h4 className="font-semibold">
                    I would like to request a return of my product. Where do I
                    raise the request?
                  </h4>
                  <p>
                    Only If you find the product to be damaged or defective
                    during unboxing, you can return it. As per return policy, an
                    unboxing video must accompany the claim.
                  </p>
                  <p>
                    <a href="mailto:letstalk@zoozle.in" target="_blank">
                      You can raise the request at
                    </a>
                    <a href="mailto:letstalk@zoozle.in" target="_blank">
                      letstalk@Zoozle.in
                    </a>
                  </p>
                </li>
              </ol>
            </div>
          </Collapse>

          <div
            onClick={toggleOpenZoozleFaqs}
            className="flex justify-between py-4 ring-1 ring-black ring-opacity-15 px-4"
          >
            <h1 className="text-[14px] font-semibold"> Zoozle App FAQS </h1>
            <img
              src="/svg/footer_arrow.svg"
              alt="Arrow button"
              width={20}
              height={20}
              className="rotate-0 transform transition-all duration-300 "
            ></img>
          </div>
          <Collapse open={openZoozleFaqs}>
            <div className="card-body p-0 py-4 text-justify">
              <p className="md:px-12 px-4 py-4">Manage Account</p>
              <ol className="list-decimal md:px-12 pl-8 pr-1 marker:font-bold space-y-4">
                <li data-list-text="1.">
                  <h4 className="font-semibold">How do I grow my business?</h4>
                  <p>
                    Now that you&apos;re on board, it&apos;s time to start your
                    business! Business building is a gradual process, but
                    persistent efforts yield great results. Let&apos;s dig
                    deeper into the factors that make Zoozle a great place to
                    grow your business -
                  </p>
                  <ol className="list-decimal space-y-2 px-4 my-2">
                    <li data-list-text="a.">
                      <h4 className="font-semibold">
                        Customer base:
                        <span className="font-semibold">
                          Your business will grow when you receive more orders
                          from more customers. Zoozle allows you to use a
                          feature called broadcast where you can select your own
                          target customer base. Remember, every new person you
                          meet is a potential customer.
                        </span>
                      </h4>
                    </li>
                    <li data-list-text="b.">
                      <h4 className="font-semibold">
                        Customer satisfaction:
                        <span className="font-semibold">
                          Your customers define who you are, so you must make
                          sure that you do not compromise on quality and give
                          the best price. Always ask for feedback when it comes
                          to orders. This will assure them that you care. The
                          more satisfied they are, the more likely they are to
                          keep shopping with you. It is the best investment to
                          have a returning customer.
                        </span>
                      </h4>
                    </li>
                    <li data-list-text="c.">
                      <h4 className="font-semibold">
                        Broadcast
                        <span className="font-semibold">
                          : This feature is exclusively for Zoozle sellers,
                          using this feature business owners can send their
                          deals to their choice of customers by notifications on
                          the Zoozle app and WhatsApp. You can use Zoozle coins
                          earned on every transaction to broadcast your product
                          or pay Rs 2 per notification. This helps in reaching
                          more potential customers to sales on demand.
                        </span>
                      </h4>
                      <p>
                        <br />
                      </p>
                    </li>
                  </ol>
                </li>
                <li className="space-y-2">
                  <h1 className="font-semibold">How to add a new address?</h1>
                  <p>Step 1: Open Zoozle App</p>
                  <p>
                    Step 2: Click on &quot;Profile&quot; in the bottom right
                    corner Step 3: Click on &quot;Manage Address&quot;
                  </p>
                  <p>
                    Step 4: Click on &quot;Add New&quot; and fill in the address
                    details Step 5: Press Continue to save
                  </p>
                </li>
                <li data-list-text="3.">
                  <h4 className="font-semibold">
                    What is a Zoozle Virtual Account?
                  </h4>
                  <p>
                    Zoozle Virtual Account is a unique generated account number
                    that gets created immediately after the seller onboards.
                    This account helps the seller to transact.
                  </p>
                </li>
                <li data-list-text="4.">
                  <h4 className="font-semibold">
                    How do I add and manage users?
                  </h4>
                  <p>
                    &quot;Manage users&quot; is a feature where the Business
                    owner can add users like friends or family members.
                  </p>
                  <h4 className="font-semibold">Benefits</h4>
                  <ul className="px-8 list-disc space-y-2">
                    <li data-list-text="●">
                      <p>
                        Added users can start buying from the Zoozle platform
                        without the need for GST.
                      </p>
                    </li>
                    <li data-list-text="●">
                      <p>
                        The purchases made by these users will increase the
                        number of Zoozle coins in the business owner&apos;s
                        account.
                      </p>
                    </li>
                    <li data-list-text="●">
                      <p>
                        These Zoozle coins can be redeemed by the business owner
                        to broadcast his deals.
                      </p>
                    </li>
                    <li data-list-text="●">
                      <p>
                        The added users can only buy products, but not sell and
                        broadcast.
                      </p>
                    </li>
                  </ul>
                </li>
                <li className="space-y-2">
                  <h4 className="font-semibold">
                    {" "}
                    How to link my business bank account?
                  </h4>
                  <p>Step 1: Open Zoozle App</p>
                  <p>
                    Step 2: Click on &quot;Profile&quot; in the bottom right
                    corner Step 3: Click on &quot;Linked Bank Account&quot;
                  </p>
                  <p>
                    Step 4: Fill in the Bank details Step 5: Press Continue to
                    save
                  </p>
                </li>
                <li data-list-text="6.">
                  <h4 className="font-semibold">
                    Why should I provide my bank details?
                  </h4>
                  <p>
                    Adding your bank account helps you to transfer money from
                    your virtual account to your business account.
                  </p>
                </li>
                <li data-list-text="7.">
                  <h4 className="font-semibold">
                    Is GST registration mandatory to enrol in the Zoozle
                    Entrepreneur Program?
                  </h4>
                  <p>
                    No, GST registration is not mandatory to enrol in the Zoozle
                    Entrepreneur Program.
                  </p>
                </li>
                <li data-list-text="8.">
                  <h4 className="font-semibold">
                    How do I contact the Zoozle Support Team?
                  </h4>
                  <p className="s2">
                    <a href="mailto:letstalk@zoozle.in" target="_blank">
                      You can contact us through chat support on the app or
                      reach us out at{" "}
                    </a>
                    letstalk@Zoozle.in
                    <Link href="mailto:support@zoozle.in" target="_blank">
                      or{" "}
                    </Link>
                    <Link
                      className="text-[#6A4FA3]"
                      href="mailto:support@zoozle.in"
                      target="_blank"
                    >
                      support@zoozle.in
                    </Link>
                  </p>
                </li>
              </ol>
            </div>
          </Collapse>

          <div
            onClick={toggleOpenZenFaqs}
            className="flex justify-between py-4 ring-1 ring-black ring-opacity-15 px-4"
          >
            <h1 className="text-[14px] font-semibold"> ZEN FAQS</h1>
            <img
              src="/svg/footer_arrow.svg"
              alt="Arrow button"
              width={20}
              height={20}
              className="rotate-0 transform transition-all duration-300 "
            ></img>
          </div>

          <Collapse open={openZenFaqs}>
            <div className="card-body p-0 py-4">
              <ol className="list-decimal md:px-12 pl-8 marker:font-bold space-y-4 text-justify pr-1">
                <li data-list-text="1.">
                  <h4 className="font-semibold">
                    What is ZEN and how does it work?
                  </h4>
                  <p>
                    ZEN refers to the Zoozle Entrepreneur Network, which is a
                    community of people who want to become micro distributors to
                    earn extra income. ZEN members get a white labelled
                    platform, such as Rahul.zoozle.in, with thousands of
                    products from sellers across India listed on their platform.
                    Members can promote these products to their network and earn
                    a commission every time someone places an order through
                    their platform.
                  </p>
                </li>
                <li data-list-text="1.">
                  <h4 className="font-semibold">
                    Who is eligible to become a ZEN?
                  </h4>
                  <p className="py-2">
                    An individual is eligible to become a ZEN If they qualify
                    the below criteria.&nbsp;
                  </p>
                  <ol className="list-disc px-4 space-y-2">
                    <li>Should be an Indian Citizen&nbsp;</li>
                    <li>Should be 18+ years of age</li>
                    <li>Should have &nbsp;Pan card</li>
                    <li>Should have Aadhaar card&nbsp;</li>
                    <li>Should have bank account&nbsp;</li>
                    <li>
                      Overall family income should be up to 50K and above&nbsp;
                    </li>
                    <li>&nbsp;500+ offline and online social network&nbsp;</li>
                  </ol>
                  <p></p>
                </li>
                <li data-list-text="1.">
                  <h4 className="font-semibold">How can I become a ZEN?</h4>
                  <p>
                    To become a ZEN, you need to download the Zoozle
                    Entrepreneur (ZEN) application from either the Play Store or
                    App Store. Once downloaded, follow these steps to register:
                  </p>
                  <ol className="list-decimal px-7 space-y-2">
                    <li>Enter your mobile number and verify with OTP</li>
                    <li>
                      Choose your store name and domain name (note that these
                      cannot be modified once registered unless you opt to
                      upgrade to &quot;ZEN PRO&quot;)
                    </li>
                    <li>
                      Your online store will be created and you will be all set
                      to start selling
                    </li>
                    <li>
                      Complete your KYC by going to the &quot;Coaching&quot;
                      section on the ZEN application
                    </li>
                    <li>
                      After completing these steps, you will have successfully
                      become a ZEN and can start selling products from your
                      store.
                    </li>
                  </ol>
                  <p></p>
                </li>
                <li data-list-text="1.">
                  <h4 className="font-semibold">
                    Can I use my own domain name for my ZEN online store?
                  </h4>
                  <p>
                    Currently, we do not have an option where you can use your
                    own domain name for your ZEN online store. However, this is
                    in the pipeline and will be implemented in the future. We
                    will notify you once we have this option available. For now,
                    you can use the zoozle.in domain name for your ZEN online
                    store.
                  </p>
                </li>
                <li data-list-text="1.">
                  <h4 className="font-semibold">
                    Why am I not able to view the Coaching videos on ZEN?
                  </h4>
                  <p>
                    You are not able to view the Coaching videos on ZEN because
                    you have not completed your KYC. To view the Coaching
                    videos, it is mandatory to complete your KYC. Once you
                    complete your KYC, you will be able to access the Coaching
                    section on the ZEN app and watch the videos.
                  </p>
                </li>
                <li data-list-text="1.">
                  <h4 className="font-semibold">
                    How can I complete my KYC on ZEN?
                  </h4>
                  <p>
                    To complete your KYC on ZEN, please follow the below steps:
                  </p>
                  <ol className="space-y-3 list-decimal px-5">
                    <li>Go to the ZEN application.</li>
                    <li>Go to &quot;Coaching&quot;</li>
                    <li>Watch the first video</li>
                    <li>Click on the &quot;Complete KYC&quot; option.</li>
                    <li>
                      Enter your Aadhaar number and verify it through OTP.
                    </li>
                    <li>Enter your PAN details and upload an image.</li>
                    <li>
                      Enter your bank account details and upload a cancelled
                      cheque
                    </li>
                  </ol>
                  <p></p>
                </li>
                <li data-list-text="1.">
                  <h4 className="font-semibold">
                    Is it mandatory to have a cancelled cheque or passbook to
                    register as ZEN ?
                  </h4>
                  <p>
                    It is important to have your correct bank account link to
                    your Zen account. Therefore we ask for a cancel cheque to
                    ensure accuracy
                  </p>
                </li>
                <li data-list-text="1.">
                  <h4 className="font-semibold">
                    Can I be a seller and a ZEN at the same time?
                  </h4>
                  <p>
                    Yes, you can be a seller and a ZEN at the same time.
                    However, you will need to have two different phone numbers
                    for each account. You can use one phone number for your
                    seller account and another phone number for your ZEN
                    account.
                  </p>
                </li>
                <li data-list-text="1.">
                  <h4 className="font-semibold">
                    What are the steps to upgrade to ZEN Pro?
                  </h4>
                  <p>To upgrade to ZEN Pro, please follow these steps:</p>
                  <ol className="list-decimal px-5 space-y-3 ">
                    <li>Open the ZEN application</li>
                    <li>Click on your profile</li>
                    <li>Click on &quot;Manage Subscription&quot;</li>
                    <li>Choose the &quot;ZEN Pro&quot; upgrade option</li>
                    <li>
                      Select your preferred domain name (Note: this cannot be
                      changed in the future, so make sure to enter the correct
                      domain name)
                    </li>
                    <li>Proceed with the payment process.</li>
                  </ol>
                  <p></p>
                </li>
                <li data-list-text="1.">
                  <h4 className="font-semibold">
                    What are the benefits of ZEN PRO?
                  </h4>
                  <p>
                    Registering as a ZEN pro offers several benefits such as
                    higher commission on each sale compared to ZEN basic, the
                    option to choose a domain name of your choice, and
                    eligibility for selection to upgrade to &quot;ZEN
                    PLUS&quot;.
                  </p>
                </li>
                <li data-list-text="1.">
                  <h4 className="font-semibold">
                    What payment options are available for ZEN subscription?
                  </h4>
                  <p>
                    All UPI payment options are available for ZEN subscription.
                  </p>
                </li>
                <li data-list-text="1.">
                  <h4 className="font-semibold">
                    How can I share my ZEN store to my network?
                  </h4>
                  <p>
                    To share your ZEN store to your network, follow the below
                    steps:
                  </p>
                  <ol className="px-5 space-y-2 list-decimal">
                    <li>Open the ZEN application.</li>
                    <li>Click on &quot;My Store&quot;.</li>
                    <li>
                      On the top right corner, you will see a share button.
                    </li>
                    <li>
                      Click on the share button to share your ZEN store with
                      your network.
                    </li>
                  </ol>
                  <p></p>
                </li>
                <li data-list-text="1.">
                  <h4 className="font-semibold">
                    Can customers directly purchase from Zoozle.in instead of my
                    store?
                  </h4>
                  <p>
                    Yes, customers can purchase from Zoozle.in instead of your
                    store. However, it is recommended that you ensure your
                    customers buy from your specific URL to maintain your
                    network. Although we cannot prevent buyers from purchasing
                    from other ZEN&apos;s stores or our website directly.
                    Similarly, if another ZEN&apos;s customer buys from your
                    store, we do not have control over it.
                  </p>
                </li>
                <li data-list-text="1.">
                  <h4 className="font-semibold">
                    How to know if a new product is added to ZEN?
                  </h4>
                  <p>
                    There are two ways to find out if a new product is added to
                    ZEN. Firstly, you can check your ZEN store to see if there
                    are new categories or products added. Secondly, you may also
                    receive notifications from time to time that new products
                    have been added.
                  </p>
                </li>
                <li data-list-text="1.">
                  <h4 className="font-semibold">
                    How can I determine the percentage of commission I can earn?
                  </h4>
                  <p>
                    The commission percentage varies depending on the product.
                    To view your earnings for each product, please follow these
                    steps:
                  </p>
                  <ol>
                    <li>
                      Open your ZEN application and go to &quot;My Store&quot;
                    </li>
                    <li>Select any product from your store</li>
                    <li>
                      You will see your commission percentage displayed for that
                      specific product.
                    </li>
                  </ol>
                  <p></p>
                </li>
                <li data-list-text="1.">
                  <h4 className="font-semibold">
                    How can I add a coupon to my product on ZEN application?
                  </h4>
                  <p>
                    To add a coupon to your product on ZEN application, please
                    follow these steps:
                  </p>
                  <ol className="space-y-2 px-6 list-decimal my-2">
                    <li>Open the ZEN application</li>
                    <li>Click on &quot;My Store&quot;</li>
                    <li>
                      Select the category of the product you want to add a
                      coupon for (e.g. Agarbatti)
                    </li>
                    <li>
                      Click on the particular product you want to add a coupon
                      for
                    </li>
                    <li>Click on &quot;Create Coupon&quot;</li>
                    <li>Enter the name of the coupon</li>
                    <li>Set the discount on commission</li>
                    <li>
                      Click on &quot;Create and Share with Coupon&quot; to save
                      and share the coupon with your customers.
                    </li>
                  </ol>
                  <p></p>
                </li>
                <li data-list-text="1.">
                  <h4 className="font-semibold">
                    How do discount coupons work on ZEN application?
                  </h4>
                  <p>
                    The discount coupons on ZEN application work by deducting
                    the percentage discount from the commission you earn on the
                    sale of a particular product. It is not mandatory to apply
                    coupons to all products you wish to sell, as it is solely
                    your decision to offer a discount to your buyers or not.
                  </p>
                  <p>
                    For example, if the selling price of the product is Rs. 1000
                    and your earnings from this product are Rs. 100, and you
                    create a coupon for a 50% discount which is equal to Rs. 50,
                    the buyer will receive a discount of Rs. 50 on the selling
                    price of the product. The amount paid by the buyer after
                    discount is Rs. 950, and your earnings after the sale of the
                    product will be Rs. 50 instead of Rs. 100.
                  </p>
                </li>
                <li data-list-text="1.">
                  <h4 className="font-semibold">What are successful orders?</h4>
                  <p>
                    Successful orders refer to any order where the product is
                    successfully delivered to the buyer and there is no request
                    for refund, replacement or return. Refund, replacement or
                    return can be claimed only within 7 days from the date of
                    delivery. Hence, a waiting period of 7 days is required
                    before an order is considered successful.
                  </p>
                </li>
                <li data-list-text="1.">
                  <h4 className="font-semibold">
                    How can I track my customer orders on ZEN application?
                  </h4>
                  <p>
                    To track your customer orders on ZEN application, you need
                    to follow these steps:
                  </p>
                  <ol className="list-decimal px-6 space-y-2 my-2">
                    <li>Go to the ZEN application.</li>
                    <li>Click on &quot;View Details&quot; on the dashboard.</li>
                    <li>Click on &quot;Orders.&quot;</li>
                    <li>Click on &quot;Track Order.&quot;</li>
                  </ol>
                  This will allow you to track the status and location of your
                  customer orders in real-time.
                  <p></p>
                </li>
                <li data-list-text="1.">
                  <h4 className="font-semibold">
                    Can ZEN take care of the logistics?
                  </h4>
                  <p>
                    No, ZEN does not take care of the logistics. The seller is
                    responsible for managing the logistics of their products,
                    including shipping and delivery to the buyer.
                  </p>
                </li>
                <li data-list-text="1.">
                  <h4 className="font-semibold">
                    Will the buyer receive an invoice after purchasing on ZEN
                    application?
                  </h4>
                  <p>
                    Yes, the buyer will receive a proper invoice for all orders
                    placed on ZEN application. The invoice will provide details
                    about the product, price, taxes (if applicable), and the
                    total amount paid by the buyer.
                  </p>
                </li>
                <li data-list-text="1.">
                  <h4 className="font-semibold">
                    When will I receive my payment for sales made on ZEN
                    application?
                  </h4>
                  <p>
                    The settlement for ZEN is done on the 15th of every month
                    for all successful orders made in the previous month (1st to
                    30th). This means that you will receive your payment on the
                    15th of the current month for all the successful orders you
                    made in the previous month.
                  </p>
                  <p>
                    For example, all the successful orders done from 1st to 31st
                    March settlement will be done on 15th April.
                  </p>
                </li>
                <li data-list-text="1.">
                  <h4 className="font-semibold">
                    Is there an email ID that I can use to send my queries ?
                  </h4>
                  <p>
                    Yes, for any query, you can reach out to us at
                    <a
                      className="link-sm link-secondary"
                      href="mailto:letstalk@zoozle.in"
                    >
                      letstalk@zoozle.in
                    </a>
                  </p>
                </li>
                <li data-list-text="1.">
                  <h4 className="font-semibold">
                    Do I need to have a GST number to become a ZEN?
                  </h4>
                  <p>
                    No, you do not need a GST number to become a ZEN, until you
                    cross a certain earning threshold. It is advised to check
                    with your CA if needed. However, in the future, if your
                    earnings cross a certain threshold, you may have to apply
                    for GST.
                  </p>
                </li>
                <li data-list-text="1.">
                  <h4 className="font-semibold">
                    What is the return policy for products on Zoozle?
                  </h4>
                  <p>
                    The return policy for products on Zoozle is that products
                    can only be returned if the customer receives a wrong or
                    damaged product. The customer must provide an unboxing video
                    as proof of the wrong or damaged product for the return to
                    be accepted within 7 days from the date of delivery of the
                    product. If a wrong or damaged product is received, the
                    seller will attempt to replace it within a set timeframe. If
                    the seller cannot replace the product, a refund will be
                    issued to the customer.
                  </p>
                </li>
                <li data-list-text="1.">
                  <h4 className="font-semibold">
                    What should I do if I am unable to login to the ZEN
                    application?
                  </h4>
                  <p>
                    Hi, if you are unable to login to the ZEN application,
                    please share the following details with us for better
                    understanding:
                  </p>
                  <ol>
                    <li>Mobile Phone Brand ,Model and version</li>
                    <li>
                      It will be helpful if you can share a screen recording of
                      the issue. Our team will try to connect with you over call
                      if needed.
                    </li>
                  </ol>
                  <p></p>
                </li>
                <li data-list-text="1.">
                  <h4 className="font-semibold">
                    Why is there no option to call Zen support?
                  </h4>
                  <p>
                    Currently, we do not provide phone support. However, our
                    team is always here to assist you through our chat support.
                    Please feel free to send us a message and we&apos;ll be more
                    than happy to help you with any questions or concerns you
                    may have. If you have any urgent issues, you can also share
                    your contact details and our team will reach out to you.
                  </p>
                </li>
                <li data-list-text="1.">
                  <h4 className="font-semibold">
                    What is the commission earned on each product on ZEN
                    Application?
                  </h4>
                  <p>
                    The commission varies from product to product on ZEN
                    platform. To see your earning for each product, you can
                    follow the given steps:
                  </p>
                  <ol>
                    <li>Go to &quot;My Store&quot; on your ZEN Application</li>
                    <li>
                      Click on any product and you will see your commission
                    </li>
                  </ol>
                  <p></p>
                </li>
              </ol>
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
}

export default Faq;

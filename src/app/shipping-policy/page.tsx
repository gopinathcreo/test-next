import React from "react";

function shippingPolicy() {
  return (
    <div className="container space-1 mt-5 pl-0 space-top-md-1 space-bottom-md-1">
      <div className="position-relative gradient-half-primary-v1 space-top-md-1 space-bottom-md-2 rounded-top-pseudo px-7 px-md-9">
        <h1 className="font-weight-semi-bold flex justify-center font-bold md:text-[40px] text-[30px]">
          Shipping policy
        </h1>
      </div>
      <div className="md:px-12 text-justify px-4">
        <div className="card shadow-sm">
          <div className="card-body p-md-9">
            <div className="rte">
              <p className="py-2">
                <strong>Welcome to Shipping Policy of&nbsp;Zoozle</strong>
              </p>
              <p className="py-2">
                Zoozle Tech Private Limited&nbsp;(Zoozle here after) has
                partnered with 3rd party logistics provider for pickup of the
                products from sellers and delivery to their customers. Our
                sellers are present in different locations across India. Once
                the order is placed on Zoozle, its passed on to the respective
                sellers and the order gets picked up from the seller and then
                dispatched to the customers.&nbsp;In some cases seller does
                self-delivery but the tracking link will be provided to the
                buyers to check the status of their order.
              </p>
              <p className="py-2">
                <strong>
                  Few facts to keep into consideration while ordering from
                  Zoozle:
                </strong>
              </p>
              <ul className="list-disc pl-8 space-y-3">
                <li>
                  Our Home decor products such as toran, nameplates and other
                  customized products are made on order, so it requires minimum
                  2-8 working days to make it and then its dispatched. The
                  making time is purely dependent upon the type of the product.
                </li>
                <li>We will keep you posted on the status of your order.</li>
                <li>
                  Once Zoozle gets confirmation from our sellers about the
                  readiness of the product ordered, we initiate a dispatch from
                  the seller.
                </li>
                <li>
                  Customer gets all the necessary notifications via email and
                  SMS from our delivery partner on every step of shipping -
                  packed, shipped (dispatched), out for delivery &amp;
                  delivered.
                </li>
                <li>
                  There might be a delay in the shipping of the product due to
                  COVID. If your delivery address lies in the red zone, there
                  might be delay in delivery of the product.&nbsp;
                </li>
                <li>
                  <strong>
                    Approximate delivery TAT is 7-15 working days, depending on
                    the products you order. Request you to be please patient.
                  </strong>
                </li>
              </ul>
              <p className="py-2">
                <strong>
                  Happy Shopping of authentic Indian products from Indian
                  sellers on Zoozle.
                </strong>
              </p>
              <p className="py-2">
                <strong>Keep empowering our small businesses.</strong>
              </p>
              <p>&nbsp;</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default shippingPolicy;

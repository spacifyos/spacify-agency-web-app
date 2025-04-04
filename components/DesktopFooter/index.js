import CustomImage from "@/components/CustomImage";
import Image from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import _, { get, includes, map } from "lodash";
import moment from "moment";

const DesktopFooter = () => {
  const socialMediaIconList = [
    { icon: Image.tiktokIcon, value: "https://www.tiktok.com/@belivecoliving" },
    {
      icon: Image.instagramIcon,
      value: "https://www.instagram.com/belivecoliving",
    },
    {
      icon: Image.facebookIcon,
      value: "https://www.facebook.com/BeLiveCoLiving",
    },
    { icon: Image.youtubeIcon, value: "https://m.youtube.com/@BeLiveColiving" },
    {
      icon: Image.linkinIcon,
      value: "https://www.linkedin.com/company/belive-co-living",
    },
    { icon: Image.twitterIcon, value: "https://x.com/BeLiveColiving" },
  ];

  //xl:block lg:block md:block sm:hidden hidden
  return (
    <div className={`bg-white pb-0 sm:pb-0 md:pb-0 lg:pb-0 xl:pb-0`}>
      <div className="py-6" style={{ backgroundColor: "#F0F0F0" }}>
        <div className="container mx-auto grid grid-cols-1 gap-6 sm:grid-cols-1 sm:gap-6 md:grid-cols-1 md:gap-8 lg:grid-cols-3 lg:gap-10 xl:grid-cols-3 xl:gap-10">
          <div className="col-span-1">
            <CustomText textClassName="text-primary text-xs pb-2 text-justify">
              Malaysia’s Leading CoLiving Platform for Students, Professionals,
              and Families
            </CustomText>
            <CustomText textClassName="text-justify text-xs leading-4">
              Discover your ideal living space with our comprehensive platform,
              designed for room rentals and beyond. Whether you’re searching for{" "}
              <span className="text-primary">rooms</span>,{" "}
              <span className="text-primary">entire units</span>,{" "}
              <span className="text-primary">short-term stays</span>,{" "}
              <span className="text-primary">or carpark rentals</span>, our
              user-friendly platform caters to all your needs across Malaysia.
            </CustomText>

            {/*<div className="flex justify-center">*/}
            {/*  <CustomImage*/}
            {/*    imageStyle={{ width: 150, height: 150 }}*/}
            {/*    src={Image.logo}*/}
            {/*  />*/}
            {/*</div>*/}
          </div>

          <div className="col-span-1">
            <CustomText textClassName="text-primary text-xs pb-2 text-justify">
              Your Journey to the Perfect Space Starts Here
            </CustomText>
            <CustomText textClassName="text-justify text-xs leading-4">
              From affordable co-living spaces to luxury units, our listings are
              tailored to suit diverse preferences and budgets. With detailed
              maps, high-quality images, and verified listings, finding the
              right property has never been easier.
            </CustomText>
          </div>

          <div className="col-span-1">
            <div className="flex flex-col gap-2">
              <div className="flex grid-cols-8 items-center gap-2 sm:flex md:flex lg:grid xl:grid">
                <CustomImage
                  src={Image.phoneIconActive}
                  className="col-span-1 w-5"
                />
                <CustomText textClassName="col-span-7 text-xs">
                  +6011 5899 7378
                </CustomText>
              </div>

              <div className="flex grid-cols-8 items-start gap-2 sm:flex md:flex lg:grid xl:grid">
                <CustomImage
                  src={Image.emailIconActive}
                  className="col-span-1 w-5"
                />
                <CustomText textClassName="col-span-7 text-xs">
                  spacify.asia@gmail.com
                </CustomText>
              </div>

              <div className="flex grid-cols-8 items-start gap-2 sm:flex md:flex lg:grid xl:grid">
                <div className="col-span-1">
                  <CustomImage src={Image.locationIconActive} className="w-5" />
                </div>

                <CustomText textClassName="col-span-7 text-justify text-xs">
                  A-5-9, Level 5, Block A, Empire Tower, Jalan SS16/1, SS 16,
                  47500 Subang Jaya, Selangor.
                </CustomText>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-1 sm:gap-6 md:grid-cols-1 md:gap-8 lg:grid-cols-3 lg:gap-10 xl:grid-cols-3 xl:gap-10">
          <div className="col-span-1 flex flex-col gap-2 sm:col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-2">
            <CustomText textClassName="text-xs">Why Choose Us?</CustomText>

            <ul className="list-disc pl-4">
              <li>
                <CustomText textClassName="text-justify text-xs">
                  <span className="text-primary">Diverse Listings</span>:
                  Explore options for{" "}
                  <span className="text-primary">room rentals</span>,{" "}
                  <span className="text-primary">whole-unit rentals</span>,{" "}
                  <span className="text-primary">short stays</span>, and even{" "}
                  <span className="text-primary">carpark spaces</span>.
                </CustomText>
              </li>
              <li>
                <CustomText textClassName="text-justify text-xs">
                  <span className="text-primary">Optimized Convenience</span>:
                  Access real-time availability, secure online bookings, and
                  transparent pricing.
                </CustomText>
              </li>
              <li>
                <CustomText textClassName="text-justify text-xs">
                  <span className="text-primary">Expert Guidance</span>:
                  Leverage our{" "}
                  <span className="text-primary">insider guides</span>, market
                  insights, and professional support to make informed decisions.
                </CustomText>
              </li>
            </ul>

            <CustomText textClassName="text-xs">
              Explore Services Beyond Renting
            </CustomText>
            <CustomText textClassName="text-justify text-xs">
              We’re more than just a room rental platform. Our upcoming services
              include:
            </CustomText>

            <ul className="list-disc pl-4">
              <li>
                <CustomText textClassName="text-justify text-xs">
                  <span className="text-primary">Short-Term Stays</span>:
                  Perfect for business trips, vacations, or temporary
                  accommodations.
                </CustomText>
              </li>
              <li>
                <CustomText textClassName="text-justify text-xs">
                  <span className="text-primary">Whole-Unit Rentals</span>:
                  Ideal for families or groups seeking private and spacious
                  living spaces.
                </CustomText>
              </li>
              <li>
                <CustomText textClassName="text-justify text-xs">
                  <span className="text-primary">Carpark Rentals</span>: Secure
                  parking options in prime locations.
                </CustomText>
              </li>
            </ul>

            <CustomText textClassName="text-justify text-xs">
              Find the Perfect Space, Hassle-Free
            </CustomText>
            <CustomText textClassName="text-justify text-xs">
              Whether you’re a student, working professional, or family, our
              advanced search tools,{" "}
              <span className="text-primary">tenant-friendly policies</span>,
              and{" "}
              <span className="text-primary">landlord support services</span>{" "}
              ensure a seamless experience. Start your property journey with us
              today and join thousands of satisfied tenants.
            </CustomText>
            {/*<CustomText textClassName="font-bold">*/}
            {/*  Additional Features to Enhance Your Experience*/}
            {/*</CustomText>*/}

            {/*<ul className="list-disc">*/}
            {/*  <li>*/}
            {/*    <CustomText>*/}
            {/*      <span className="text-primary">*/}
            {/*        Interactive Maps*/}
            {/*      </span>*/}
            {/*      : Locate properties near universities, public transport, or*/}
            {/*      business hubs.*/}
            {/*    </CustomText>*/}
            {/*  </li>*/}
            {/*  <li>*/}
            {/*    <CustomText>*/}
            {/*      <span className="text-primary">*/}
            {/*        Smart Technology Integration*/}
            {/*      </span>*/}
            {/*      : Simplify rental processes with{" "}*/}
            {/*      <span className="text-primary">*/}
            {/*        smart contracts*/}
            {/*      </span>{" "}*/}
            {/*      and automated billing systems.*/}
            {/*    </CustomText>*/}
            {/*  </li>*/}
            {/*  <li>*/}
            {/*    <CustomText>*/}
            {/*      <span className="text-primary">*/}
            {/*        Dedicated Support*/}
            {/*      </span>*/}
            {/*      : Reach out to our team for personalized assistance anytime.*/}
            {/*    </CustomText>*/}
            {/*  </li>*/}
            {/*</ul>*/}
          </div>

          <div className="col-span-1 grid grid-cols-2 gap-6 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-10">
            <div className="col-span-1 flex flex-col gap-2">
              <CustomText textClassName="text-primary font-bold text-base pb-2">
                Company
              </CustomText>

              <CustomText textClassName="text-xs">About Us</CustomText>

              <CustomText textClassName="text-xs">Career</CustomText>

              <CustomText textClassName="text-xs">Contact Us</CustomText>
            </div>

            <div className="col-span-1 flex flex-col gap-2">
              <CustomText textClassName="text-primary font-bold text-base pb-2">
                Help Center
              </CustomText>

              <CustomText textClassName="text-xs">FAQs</CustomText>

              <CustomText textClassName="text-xs">Tenant Support</CustomText>

              <CustomText textClassName="text-xs">
                Landlord Resources
              </CustomText>
            </div>

            <div className="col-span-1 flex flex-col gap-2">
              <CustomText textClassName="text-primary font-bold text-base pb-2">
                Discover
              </CustomText>

              <CustomText textClassName="text-xs">Room Rentals</CustomText>

              <CustomText textClassName="text-xs">
                Whole-Unit Rentals
              </CustomText>

              <CustomText textClassName="text-xs">Short Stays</CustomText>

              <CustomText textClassName="text-xs">Carpark Rentals</CustomText>
            </div>

            <div className="col-span-1 flex flex-col gap-2">
              <CustomText textClassName="text-primary font-bold text-base pb-2">
                Others
              </CustomText>

              <CustomText textClassName="text-xs">Market Trends</CustomText>

              <CustomText textClassName="text-xs">Rental Tips</CustomText>

              <CustomText textClassName="text-xs">
                Investment Insights
              </CustomText>

              <CustomText textClassName="text-xs">Insider Guides</CustomText>
            </div>
          </div>
        </div>

        <div className="divider-line" style={{ margin: "16px 0" }}></div>

        <div className="flex flex-row-reverse flex-wrap items-center justify-center gap-4 pb-4 sm:justify-center md:justify-between lg:justify-between xl:justify-between">
          <div className="flex gap-3">
            {map(socialMediaIconList, (item, index) => {
              const icon = get(item, ["icon"], "");
              const value = get(item, ["value"], "");

              return (
                <a href={value} target="_blank" key={index}>
                  <CustomImage
                    src={icon}
                    imageStyle={{ width: 25, height: 25 }}
                  />
                </a>
              );
            })}
          </div>

          <CustomText textClassName="text-xs text-center">
            Copyright © {moment().year()} Spacify Technologies Sdn Bhd (Co.No.:
            201901004017) All rights reserved.
          </CustomText>
        </div>
      </div>
    </div>
  );
};

export default DesktopFooter;

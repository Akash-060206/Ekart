import { assets } from "../assets/assets"
import NewsletterBox from "../components/NewsletterBox"
import Title from "../components/Title"

const About = () => {
  return (
    <div>

      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT '} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">

        <img className="w-full md:max-w-[450px] object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105" src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center  gap-6 md:w-2/4 text-gray-600">
          <p>
            BharatKart is an Indian e-commerce platform created to make online
            shopping simple, affordable, and reliable for everyone. We bring
            together a wide range of products—from daily essentials to the
            latest trends—on one trusted platform.
          </p>

          <p>
            With a strong focus on quality, value, and customer satisfaction,
            BharatKart aims to support local sellers while delivering a smooth
            and secure shopping experience to customers across India.
          </p>

          <b className="text-gray-800">Our Mission</b>

          <p>
            Our mission is to empower Indian consumers by providing high-quality
            products at competitive prices, ensuring fast delivery, easy
            returns, and a hassle-free shopping journey.
          </p>
        </div>
      </div>

      <div className="text-4xl py-4">
        <Title text1={'WHY '} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p className="text-gray-600">
            Every product on BharatKart goes through quality checks to ensure
            reliability, durability, and complete customer satisfaction.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience</b>
          <p className="text-gray-600">
            Shop anytime, anywhere with easy navigation, secure payments,
            fast delivery, and a seamless checkout experience.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">
            Our dedicated support team is always ready to assist you with
            orders, returns, and queries—because your satisfaction matters.
          </p>
        </div>

      </div>

      <NewsletterBox />

    </div>
  )
}

export default About

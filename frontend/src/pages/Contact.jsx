import { assets } from "../assets/assets"
import NewsletterBox from "../components/NewsletterBox"
import Title from "../components/Title"

const Contact = () => {
  return (
    <div>

      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'CONTACT '} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">

        <img
          className="w-full md:max-w-[480px] h-[460px] object-cover rounded-xl shadow-lg"
          src={assets.contact_img}
          alt="Contact BharatKart"
        />

        <div className="flex flex-col justify-center items-start gap-6">

          <p className="font-semibold text-xl text-gray-700">BharatKart Office</p>

          <p className="text-gray-500">
            BharatKart Pvt. Ltd.<br />
            Sector 62, Noida<br />
            Uttar Pradesh, India
          </p>

          <p className="text-gray-500">
            Phone: +91 98765 432XX <br />
            Email: support@bharatkart.in
          </p>

          <p className="font-semibold text-xl text-gray-700">
            Careers at BharatKart
          </p>

          <p className="text-gray-500">
            Join our growing team and be a part of India’s trusted
            online shopping platform.
          </p>

          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Careers
          </button>

        </div>
      </div>

      <NewsletterBox />

    </div>
  )
}

export default Contact


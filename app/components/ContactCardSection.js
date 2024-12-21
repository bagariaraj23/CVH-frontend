import Image from "next/image";

const ContactCardSection = () => {
  return (
    <section className="bg-gradient-to-b from-[#A8C8FF] to-[#FFDEFF] py-24 px-12 font-sans">
      {/* Heading positioned above the cards container */}
      <div className="max-w-6xl mx-auto mb-8">
        <h2 className="text-left text-xl font-semibold text-[#1E1E36] ml-2">Why We're Different</h2>
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="bg-[#bff9fd] rounded-3xl p-6 text-center flex flex-col items-center h-[350px] shadow-lg">
          <Image src="/img/card1.png" alt="Network of Doctors" width={80} height={80} className="mb-4" />
          <p className="text-base font-medium text-[#3A3A5A] leading-snug font-mono px-4">
            CareValue Health has an integrated network of <strong>highly qualified</strong> and <strong>experienced</strong> American and Nigerian doctors.
          </p>
        </div>
        
        {/* Card 2 */}
        <div className="bg-[#b6e1fc] rounded-3xl p-6 text-center flex flex-col items-center h-[350px] shadow-lg">
          <Image src="/img/card2.png" alt="Secure Appointments" width={80} height={80} className="mb-4" />
          <p className="text-base font-medium text-[#3A3A5A] leading-snug font-mono px-4">
            CareValue Health provides <strong>secure</strong> in-clinic and online appointment scheduling.
          </p>
        </div>
        
        {/* Card 3 */}
        <div className="bg-[#AFAFEF] rounded-3xl p-6 text-center flex flex-col items-center h-[350px] shadow-lg">
          <Image src="/img/card3.png" alt="Patient Privacy" width={80} height={80} className="mb-4" />
          <p className="text-base font-medium text-[#3A3A5A] leading-snug font-mono px-4">
            CareValue Health prioritizes <strong>patient privacy</strong> and ensures the security of medical records.
          </p>
        </div>
        
        {/* Card 4 */}
        <div className="bg-[#AA90F1] rounded-3xl p-6 text-center flex flex-col items-center h-[350px] shadow-lg">
          <Image src="/img/card4.png" alt="Affordable Payment Plans" width={100} height={100} className="mb-4" />
          <p className="text-base font-medium text-[#3A3A5A] leading-snug font-mono px-4">
            CareValue Health offers <strong>affordable payment plans</strong> to make healthcare accessible to everyone.
          </p>
        </div>
      </div>
      
      {/* Button */}
      <div className="text-center mt-12">
        <button className="bg-[#12104A] text-blue-400 px-12 py-4 rounded-full text-lg font-semibold hover:bg-[#2f2f84] transition duration-300">
          Schedule a Consultation
        </button>
      </div>
    </section>
  );
};

export default ContactCardSection;

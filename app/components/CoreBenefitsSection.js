import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStethoscope, faUser, faShieldAlt } from "@fortawesome/free-solid-svg-icons";

export const CoreBenefitsSection = () => {
  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-12">
          Core Benefits
        </h2>

        {/* Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="flex flex-col items-center bg-[#b3e5fc] shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="text-blue-600 text-4xl mb-4">
              <FontAwesomeIcon icon={faStethoscope} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
              Access Trusted Cardiologists & Doctors
            </h3>
            <p className="text-gray-600 text-center">
              Connect with top-tier healthcare professionals anytime, anywhere.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center bg-[#9fa8da] shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="text-green-600 text-4xl mb-4">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
              Personalized Care for Every Patient
            </h3>
            <p className="text-gray-600 text-center">
              Your health journey tailored to your unique needs and goals.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center bg-[#b39ddb] shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="text-purple-600 text-4xl mb-4">
              <FontAwesomeIcon icon={faShieldAlt} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
              Your Privacy is Our Priority
            </h3>
            <p className="text-gray-600 text-center">
              We are HIPAA-compliant, ensuring your data stays safe and secure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

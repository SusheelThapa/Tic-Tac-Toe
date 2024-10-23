import Header from "../components/Header";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import susheel from "../assets/images/susheel.jpeg";

const Developer = () => {
  return (
    <>
      <Header
        mute={false}
        handleMuteButton={(value: boolean) => {
          console.log(value);
        }}
      />
      <div className="flex items-center justify-center" id="developer-section">
        <div className="flex flex-col md:flex-row items-center justify-center bg-black text-white p-8 h-[80vh] w-4/5">
          <div
            className="w-full md:w-1/3 flex justify-center items-center mb-6 md:mb-0"
            id="developer-image"
          >
            <img
              src={susheel}
              alt="Profile"
              className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover"
            />
          </div>
          <div
            className="w-full md:w-2/3 md:pl-8 text-center md:text-left"
            id="developer-description"
          >
            <h1 className="text-4xl font-bold mb-4">Susheel Thapa</h1>
            <h3 className="text-2xl mb-4">Full Stack Web Developer</h3>
            <p className="text-lg mb-4">
              Bachelor in Computer Engineering, Pulchowk Campus
            </p>
            <p className="text-lg mb-4 w-3/4">
              {" "}
              A motivated and ambitious undergraduate student with a strong
              passion for technology and software development. Possessing a
              diverse skill set in various programming languages and web
              development technologies. Quick learner and team player.
            </p>
            <div className="flex justify-center md:justify-start space-x-4 mb-4">
              <a
                href="https://www.facebook.com/susheelthapaa/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-gray-400"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com/_susheel_thapa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-gray-400"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.linkedin.com/in/susheelthapa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-gray-400"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/SusheelThapa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-gray-400"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Developer;

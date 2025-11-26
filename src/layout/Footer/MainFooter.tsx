import { Layout, Typography } from "antd";
import { FaGithub, FaLinkedin } from "react-icons/fa";
const { Text } = Typography;
const { Footer } = Layout;

const MainFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Footer
        style={{ padding: "0.75rem 0.5rem", backgroundColor: "transparent" }}
      >
        <div className="w-full flex flex-wrap justify-around lg:justify-between items-center gap-x-3">
          <div className="flex justify-center items-center">
            <Text type="secondary" className="text-center ">
              © {currentYear}قالب توسط حامد لطیفی ساخته شده است.
            </Text>
          </div>

          <div>
            <ul className="flex flex-wrap justify-center gap-x-6">
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/latifii"
                  className="flex items-center gap-1.5 group"
                >
                  <FaGithub className="text-lg text-gray-500 group-hover:text-gray-900 transition-colors duration-300" />
                  <Text
                    type="secondary"
                    className="text-base cursor-pointer group-hover:text-gray-900 transition-colors duration-300"
                  >
                    گیت‌هاب
                  </Text>
                </a>
              </li>

              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/hamedlatifi"
                  className="flex items-center gap-1.5 group"
                >
                  <FaLinkedin className="text-lg text-gray-500 group-hover:text-[#0077b5] transition-colors duration-300" />
                  <Text
                    type="secondary"
                    className="text-base cursor-pointer group-hover:text-[#0077b5] transition-colors duration-300"
                  >
                    لینکدین
                  </Text>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Footer>
    </>
  );
};

export default MainFooter;

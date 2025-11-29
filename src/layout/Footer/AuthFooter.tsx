import { Layout, Typography } from "antd";
import { ButtonElm } from "../../components/Button/ButtonElm";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const { Text } = Typography;
const { Footer } = Layout;

const links = [
  { label: "شرکت", path: "/company" },
  { label: "درباره ما", path: "/about" },
  { label: "تیم", path: "/team" },
  { label: "محصولات", path: "/products" },
  { label: "وبلاگ", path: "/blog" },
  { label: "تعرفه‌ها", path: "/pricing" },
];

const AuthFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Footer className="!pt-24 w-full !p-6">
        <div className="w-full max-w-7xl mx-auto space-y-6">
          <ul className="flex flex-wrap justify-center gap-x-6">
            {links.map(({ label, path }) => (
              <li key={label}>
                <Link to={path}>
                  <Text
                    type="secondary"
                    className="text-base cursor-pointer hover:text-gray-800"
                  >
                    {label}
                  </Text>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex justify-center gap-4">
            <ButtonElm type="text" icon={<FcGoogle size={25} />} />
            <ButtonElm type="text" icon={<FcGoogle size={25} />} />
          </div>
          <div className="w-full flex justify-center items-center">
            <Text type="secondary" className="text-center ">
              © {currentYear}قالب توسط سید حامد لطیفی ساخته شده است.
            </Text>
          </div>
        </div>
      </Footer>
    </>
  );
};

export default AuthFooter;

import { Breadcrumb } from "antd";
import { useLocation, Link } from "react-router-dom";
import { upperFirst } from "../utils/helpers";
import { menuItems } from "../data/route";

const BreadCrumbElm = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const breadcrumbItems = [
    {
      title: <Link to="/">داشبورد</Link>,
      key: "/",
    },
    ...pathSnippets.map((snippet, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      const menuItem = menuItems.find((item) => item.key === url);
      return menuItem
        ? { title: <Link to={menuItem.key}>{menuItem.label}</Link>, key: url }
        : { title: upperFirst(snippet), key: url }; // fallback if no matching menu item
    }),
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
    </>
  );
};

export default BreadCrumbElm;

import Header from "./Header/Header";
import ResponsiveHeader from "./ResponsiveHeader/ResponsiveHeader";
import "./Layout.scss";

type LayoutProps = {
  navClass: string;
  displayProjectModal: () => void;
  activeTab: string;
  changeActiveTab: (name: string) => void;
  changeClass: (name: string) => void;
  children: React.ReactNode;
};

const Layout = ({
  navClass,
  displayProjectModal,
  activeTab,
  changeActiveTab,
  changeClass,
  children,
}: LayoutProps) => {
  return (
    <div className="main-container">
      <ResponsiveHeader
        changeClass={changeClass}
        displayProjectModal={displayProjectModal}
      />
      <Header
        navClass={navClass}
        displayProjectModal={displayProjectModal}
        activeTab={activeTab}
        changeActiveTab={changeActiveTab}
      />
      <div className="content-container">{children}</div>
    </div>
  );
};

export default Layout;

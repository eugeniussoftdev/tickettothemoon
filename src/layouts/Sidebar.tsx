type SidebarProps = {
  children: React.JSX.Element;
};

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return <div className="sidebar">{children}</div>;
};

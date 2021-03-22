import React from "react";
import { useIntl } from "react-intl";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import {
  FaTachometerAlt,
  FaGem,
  FaList,
  FaGithub,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";
import Switch from "react-switch";

const SidebarMap = ({
  collapsed,
  rtl,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange,
  handleRtlChange,
}) => {
  const intl = useIntl();
  return (
    <ProSidebar
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        {collapsed ? (
          <div
            style={{
              padding: "24px",
              fontSize: 14,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <img
              src="/kappaLogo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </div>
        ) : (
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {intl.formatMessage({ id: "sidebarTitle" })}
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <Menu>
          <MenuItem
            icon={
              <Switch
                height={16}
                width={30}
                checkedIcon={false}
                uncheckedIcon={false}
                onChange={handleCollapsedChange}
                checked={collapsed}
                onColor="#219de9"
                offColor="#bbbbbb"
              />
            }
            onClick={handleCollapsedChange}
          >
            {intl.formatMessage({ id: "collapsed" })}
          </MenuItem>
          <MenuItem
            icon={
              <Switch
                height={16}
                width={30}
                checkedIcon={false}
                uncheckedIcon={false}
                onChange={handleRtlChange}
                checked={rtl}
                onColor="#219de9"
                offColor="#bbbbbb"
              />
            }
          >
            <span onClick={handleRtlChange}>
              {intl.formatMessage({ id: "rtl" })}
            </span>
          </MenuItem>
        </Menu>
        <Menu iconShape="circle">
          <MenuItem
            icon={<FaTachometerAlt />}
            suffix={
              <span className="badge red">
                {intl.formatMessage({ id: "new" })}
              </span>
            }
          >
            {intl.formatMessage({ id: "dashboard" })}
          </MenuItem>
          <MenuItem icon={<FaGem />}>
            {" "}
            {intl.formatMessage({ id: "components" })}
          </MenuItem>
        </Menu>
        <Menu iconShape="circle">
          <SubMenu
            suffix={<span className="badge yellow">3</span>}
            title={intl.formatMessage({ id: "withSuffix" })}
            icon={<FaRegLaughWink />}
          >
            <MenuItem>{intl.formatMessage({ id: "submenu" })} 1</MenuItem>
            <MenuItem>{intl.formatMessage({ id: "submenu" })} 2</MenuItem>
            <MenuItem>{intl.formatMessage({ id: "submenu" })} 3</MenuItem>
          </SubMenu>
          <SubMenu
            prefix={<span className="badge gray">3</span>}
            title={intl.formatMessage({ id: "withPrefix" })}
            icon={<FaHeart />}
          >
            <MenuItem>{intl.formatMessage({ id: "submenu" })} 1</MenuItem>
            <MenuItem>{intl.formatMessage({ id: "submenu" })} 2</MenuItem>
            <MenuItem>{intl.formatMessage({ id: "submenu" })} 3</MenuItem>
          </SubMenu>
          <SubMenu
            title={intl.formatMessage({ id: "multiLevel" })}
            icon={<FaList />}
          >
            <MenuItem>{intl.formatMessage({ id: "submenu" })} 1 </MenuItem>
            <MenuItem>{intl.formatMessage({ id: "submenu" })} 2 </MenuItem>
            <SubMenu title={`${intl.formatMessage({ id: "submenu" })} 3`}>
              <MenuItem>{intl.formatMessage({ id: "submenu" })} 3.1 </MenuItem>
              <MenuItem>{intl.formatMessage({ id: "submenu" })} 3.2 </MenuItem>
              <SubMenu title={`${intl.formatMessage({ id: "submenu" })} 3.3`}>
                <MenuItem>
                  {intl.formatMessage({ id: "submenu" })} 3.3.1{" "}
                </MenuItem>
                <MenuItem>
                  {intl.formatMessage({ id: "submenu" })} 3.3.2{" "}
                </MenuItem>
                <MenuItem>
                  {intl.formatMessage({ id: "submenu" })} 3.3.3{" "}
                </MenuItem>
              </SubMenu>
            </SubMenu>
          </SubMenu>
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: "center" }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: "20px 24px",
          }}
        >
          <a
            href="https://github.com/KappaSoftware/Kappa"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <FaGithub />
            <span> {intl.formatMessage({ id: "title" })}</span>
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default SidebarMap;

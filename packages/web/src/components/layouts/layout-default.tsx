import React from "react";

import { Box } from "@mantine/core";

import { web_config } from "@lib/config";

import {
  DesktopNavigation,
  DesktopNavigationDropdown,
  DesktopNavigationDropdownItem,
  DesktopNavigationItem,
} from "@components/navigation/desktop-navigation";
import { FooterDefault } from "@components/footers";
import { Link } from "@components/core";

export type LayoutDefaultProps = {
  children?: React.ReactNode;
};

export type NavigationItem = {
  slug: string;
  display_name: string;
  children?: NavigationItem[];
};

export type GlobalAppData = {
  title?: string;
  description?: string;
  navigation_bar: NavigationItem[];
};

export const Layout = ({
  children,
}: // navigation_items,
{
  children: React.ReactNode;
}) => {
  return (
    <Box
      sx={{
        display: "flex !important",
        flexDirection: "column",
        padding: "0px 52px",
        "@media (max-width: 980px)": {
          padding: "0px 24px",
        },
        "@media (max-width: 720px)": {
          padding: "0px 12px",
        },
      }}
    >
      <Box py={24}>
        <DesktopNavigation title={web_config.app_title}>
          <DesktopNavigationDropdown title="Conference">
            <DesktopNavigationDropdownItem>
              <Link href="/conference/overview">Conference Overview</Link>
            </DesktopNavigationDropdownItem>
            <DesktopNavigationDropdownItem>
              <Link href="/conference/itinerary">Conference Itinerary</Link>
            </DesktopNavigationDropdownItem>
            <DesktopNavigationDropdownItem>
              <Link href="/conference/presenters">Presenters</Link>
            </DesktopNavigationDropdownItem>
            <DesktopNavigationDropdownItem>
              <Link href="/conference/vendors">Vendors</Link>
            </DesktopNavigationDropdownItem>
            <DesktopNavigationDropdownItem>
              <Link href="/conference/get-involved">Get Involved</Link>
            </DesktopNavigationDropdownItem>
          </DesktopNavigationDropdown>

          <DesktopNavigationItem>
            <Link href="/blog">Blog</Link>
          </DesktopNavigationItem>

          <DesktopNavigationDropdown title="About Us">
            <DesktopNavigationDropdownItem>
              <Link href="/about-us/our-story">Our Story</Link>
            </DesktopNavigationDropdownItem>
            <DesktopNavigationDropdownItem>
              <Link href="/about-us/our-team">Our Team</Link>
            </DesktopNavigationDropdownItem>
            <DesktopNavigationDropdownItem>
              <Link href="/about-us/our-sponsors">Our Sponsors</Link>
            </DesktopNavigationDropdownItem>
            <DesktopNavigationDropdownItem>
              <Link href="/about-us/press-publications">
                Press & Publications
              </Link>
            </DesktopNavigationDropdownItem>
            {/* <DesktopNavigationDropdownItem>
              <Link href="/about-us/financial-reports">Financial Reports</Link>
            </DesktopNavigationDropdownItem> */}
          </DesktopNavigationDropdown>

          <DesktopNavigationItem>
            <Link href="/contact-us">Contact Us</Link>
          </DesktopNavigationItem>
        </DesktopNavigation>
      </Box>
      <Box py={24}>{children}</Box>
      <FooterDefault />
    </Box>
  );
};

export const Content = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const LayoutDefault = (props: LayoutDefaultProps) => {
  return (
    <Layout>
      {/* TODO - ADD SEO Here */}
      <Content>{props.children}</Content>
    </Layout>
  );
};

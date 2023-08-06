import React from "react";

import { Container, Divider, Text, Title } from "@mantine/core";

import { BasePage } from "@lib/shared";

import {
  BaseList,
  FeatureItem,
  FeatureListItem,
} from "@components/display/list";
import { LayoutDefault } from "@components/layouts";

type PageProps = {
  page_data: BasePage;
  vendor_list: FeatureItem[];
};

export const Page = ({ page_data, vendor_list }: PageProps) => {
  return (
    <>
      <Container>
        <Title color="brand-red">{page_data.heading}</Title>
      </Container>
      <Container>
        <Text dangerouslySetInnerHTML={{ __html: page_data.content }} />

        <Divider sx={{ margin: "16px 0px" }} />

        <BaseList items={vendor_list} item_type={FeatureListItem} />
      </Container>
    </>
  );
};

export const query = {
  page_data: { model: "items/conference_vendors" },
  vendor_list: {
    model: "items/conference_vendor_list",
    filter: {
      status: {
        _eq: "published",
      },
    },
  },
};

Page.getLayout = (page: React.ReactNode) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

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
  presenter_list: FeatureItem[];
};

export const Page = ({ page_data, presenter_list }: PageProps) => {
  return (
    <>
      <Container>
        <Title color="brand-red">{page_data.heading}</Title>
      </Container>
      <Container>
        <Text dangerouslySetInnerHTML={{ __html: page_data.content }} />
        <Divider sx={{ margin: "8px 0px" }} />
        <BaseList items={presenter_list} item_type={FeatureListItem} />
      </Container>
    </>
  );
};

export const query = {
  page_data: { model: "items/conference_presenters" },
  presenter_list: { model: "items/conference_presenter_list" },
};

Page.getLayout = (page: React.ReactNode) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

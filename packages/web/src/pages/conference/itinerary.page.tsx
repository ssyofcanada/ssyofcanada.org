import React from "react";

import { Container, Text, Title } from "@mantine/core";

import { BasePage } from "@lib/shared";

import { LayoutDefault } from "@components/layouts";

type PageProps = {
  page_data: BasePage;
};

export const Page = ({ page_data: { heading, content } }: PageProps) => {
  return (
    <>
      <Container>
        <Title color="brand-red">{heading}</Title>
      </Container>
      <Container>
        <Text
          dangerouslySetInnerHTML={{ __html: content }}
          sx={{ p: { margin: 0 } }}
        />
      </Container>
    </>
  );
};

export const query = {
  page_data: { model: "items/conference_itinerary" },
};

Page.getLayout = (page: React.ReactNode) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

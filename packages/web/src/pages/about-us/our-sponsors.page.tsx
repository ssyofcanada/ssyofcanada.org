import React from "react";

import { Box, Container, Divider, Text, Title } from "@mantine/core";

import { BasePage, SponsorTier } from "@lib/shared";

import {
  BaseList,
  FeatureItem,
  FeatureList,
  FeatureListItem,
} from "@components/display/list";
import { LayoutDefault } from "@components/layouts";

type PageProps = {
  page_data: BasePage;
  sponsor_list: FeatureItem[];
};

export const Page = ({
  page_data: { heading, content },
  sponsor_list,
}: PageProps) => {
  const in_kind_sponsors = sponsor_list.filter(
    (sponsor) => sponsor.tier === SponsorTier.IN_KIND
  );
  const gold_sponsors = sponsor_list.filter(
    (sponsor) => sponsor.tier === SponsorTier.GOLD
  );
  const silver_sponsors = sponsor_list.filter(
    (sponsor) => sponsor.tier === SponsorTier.SILVER
  );
  const bronze_sponsors = sponsor_list.filter(
    (sponsor) => sponsor.tier === SponsorTier.BRONZE
  );

  return (
    <>
      <Container>
        <Title size="h1" order={1} color="brand-red">
          {heading}
        </Title>
      </Container>
      <Container>
        <Text dangerouslySetInnerHTML={{ __html: content }} />

        <Divider sx={{ margin: "16px 0px" }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Box>
            <Title size="h2" order={2} color="brand-red">
              Gold Sponsors
            </Title>
            <FeatureList items={gold_sponsors} />
          </Box>
          <Box>
            <Title size="h2" order={2} color="brand-red">
              Silver Sponsors
            </Title>
            <BaseList items={silver_sponsors} item_type={FeatureListItem} />
          </Box>
          <Box>
            <Title size="h2" order={2} color="brand-red">
              Bronze Sponsors
            </Title>
            <FeatureList items={bronze_sponsors} />
          </Box>
          <Box>
            <Title size="h2" order={2} color="brand-red">
              Sponsors in Kind
            </Title>
            <FeatureList items={in_kind_sponsors} />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export const query = {
  page_data: { model: "items/our_sponsors" },
  sponsor_list: {
    model: "items/sponsor_list",
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

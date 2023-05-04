import React from "react";

import { Box, Container, Image, Text, Title } from "@mantine/core";

import { BaseCommunityBranchListItem, BasePage } from "@lib/shared";
import { web_config } from "@lib/config";

import { LayoutDefault } from "@components/layouts";

type PageProps = {
  page_data: BasePage;
  community_branches: BaseCommunityBranchListItem[];
};

export const Page = ({
  page_data: { cover_image, heading, content },
  community_branches,
}: PageProps) => {
  return (
    <>
      <Container>
        <Title size="h1" order={1} color="brand-red">
          {heading}
        </Title>
      </Container>
      <Container>
        {cover_image && (
          <Image
            src={`https://${web_config.cms_host}/assets/${cover_image}?key=large-cover`}
            radius={4}
          />
        )}
        <Text dangerouslySetInnerHTML={{ __html: content }} />
        {community_branches && (
          <>
            <Title size="h2" order={2} color="brand-red">
              Community Branches
            </Title>
            <Box
              sx={{
                // display: "flex",
                // flexWrap: "wrap",
                // justifyContent: "center",
                // gap: 12,
                display: "grid",
                "grid-template-columns": `repeat(4, 1fr)`,
                columnGap: 8,
                rowGap: 16,
                "@media (max-width: 980px)": {
                  "grid-template-columns": `repeat(3, 1fr)`,
                },
                "@media (max-width: 720px)": {
                  "grid-template-columns": `repeat(1, 1fr)`,
                },
              }}
            >
              {community_branches.map((community_branch) => (
                <Box
                  key={community_branch.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 4,
                    minWidth: 144,
                  }}
                >
                  <Image
                    src={`https://${web_config.cms_host}/assets/${community_branch.cover_image}?key=small-logo`}
                    radius="sm"
                    height={92}
                    width="auto"
                  />
                  <Title
                    size="sm"
                    order={3}
                    color="brand-green"
                    align="center"
                    sx={{
                      maxWidth: 192,
                    }}
                  >
                    {community_branch.heading}
                  </Title>
                </Box>
              ))}
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

export const query = {
  page_data: { model: "items/our_story" },
  community_branches: { model: "items/community_branch_list" },
};

Page.getLayout = (page: React.ReactNode) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

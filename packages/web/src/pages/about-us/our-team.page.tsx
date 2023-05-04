import React from "react";

import { Container, Image, Text, Title } from "@mantine/core";

import { BaseMemberListItem, BasePage } from "@lib/shared";
import { web_config } from "@lib/config";

import { BaseList, MemberListItem } from "@components/display/list";
import { LayoutDefault } from "@components/layouts";

type PageProps = {
  page_data: BasePage;
  member_list: BaseMemberListItem[];
};

export const Page = ({
  page_data: { cover_image, heading, content },
  member_list,
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
        <BaseList items={member_list} item_type={MemberListItem} />
      </Container>
    </>
  );
};

export const query = {
  page_data: { model: "items/our_team" },
  member_list: {
    model: "items/member_list",
    select: ["*", "user.*"],
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

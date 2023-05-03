import React, { useEffect, useState } from "react";

import { Box, Container, Image, Text, Title } from "@mantine/core";

import { BaseBlogPost, BasePage } from "@lib/shared";
import { Stande } from "@lib/stande";
import { web_config } from "@lib/config";

import { LayoutDefault } from "@components/layouts";
import { NewsletterForm } from "@components/forms";
import { SmallArticleCard } from "@components/display/article";

type PageProps = {
  page_data: BasePage;
};

export const Page = ({
  page_data: { cover_image, cover_image_caption, heading, content },
}: PageProps) => {
  const [blogPosts, setBlogPosts] = useState<BaseBlogPost[]>([]);

  const { search } = new Stande({
    base_url: web_config.cms_host,
  });

  useEffect(() => {
    const getBlogPosts = async () => {
      const response = await search<{ data: BaseBlogPost[] }>(
        "items/blog_post",
        {
          parameters: {
            sort: "date_created",
          },
          body: {
            query: {
              fields: "*,user_created.*",
              filter: {
                status: {
                  _eq: "published",
                },
              },
            },
          },
        }
      );
      if (response.ok) setBlogPosts(response.data.data);
    };

    getBlogPosts();
  }, []);

  return (
    <>
      <Container>
        {cover_image && (
          <Image
            src={`https://${web_config.cms_host}/assets/${cover_image}?key=large-cover`}
            alt={cover_image_caption}
            caption={cover_image_caption}
            style={{
              overflow: "hidden",
              borderRadius: 4,
            }}
          />
        )}
        <Box
          sx={{
            display: "flex",
            gap: 16,
            "@media (max-width: 920px)": {
              alignItems: "center",
              flexDirection: "column",
            },
            "@media (max-width: 680px)": {
              fontSize: 14,
            },
          }}
        >
          <Box sx={{ flexBasis: 12, flexGrow: 1 }}>
            <Box>
              {heading && (
                <Title size="h2" order={2} color="brand-red">
                  {heading}
                </Title>
              )}
            </Box>

            <Box dangerouslySetInnerHTML={{ __html: content }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Title size="h2" order={2} color="brand-red">
                {/* <Title size="h5" order={5} color="brand-green"> */}
                Stay Updated!
              </Title>
              <Text>
                Subscribe to our newsletter to keep up to date with the latest
                news and events from the team at {web_config.app_title}.
              </Text>
              <NewsletterForm />
            </Box>
          </Box>
          <Box sx={{ flexBasis: 320, flexGrow: 0 }}>
            <Title size="h2" order={2} color="brand-red" mb={16}>
              Recent Blog Posts
            </Title>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {blogPosts
                ?.sort(
                  (a, b) =>
                    new Date(b.date_created).getTime() -
                    new Date(a.date_created).getTime()
                )
                .map((x) => (
                  <SmallArticleCard key={x.id} {...x} />
                ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export const query = {
  page_data: { model: "items/landing_page" },
};

Page.getLayout = (page: React.ReactNode) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

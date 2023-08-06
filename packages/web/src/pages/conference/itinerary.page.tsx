import React from "react";

import { Box, Container, Divider, Image, Text, Title } from "@mantine/core";
import { FiArrowLeft, FiArrowRight, FiCamera } from "react-icons/fi/index.js";
import { Carousel } from "@mantine/carousel";

import { BasePage } from "@lib/shared";
import { web_config } from "@lib/config";

import { LayoutDefault } from "@components/layouts";

type ItineraryItem = BasePage & {
  images: OverviewItemImage[];
};

type OverviewItemImage = {
  id: string;
  directus_files_id: { id: string; description: string };
};

type PageProps = {
  page_data: BasePage;
  itinerary_list: ItineraryItem[];
};

export const Page = ({
  page_data: { cover_image, heading, content, images },
  itinerary_list,
}: PageProps) => {
  const RenderItineraryItemCarousel = ({
    images,
  }: {
    images: OverviewItemImage[];
  }) => {
    return (
      <Carousel
        maw={680}
        mx="auto"
        withIndicators
        controlSize={24}
        slideGap={12}
        styles={{
          indicator: {
            width: 12,
            height: 4,
            transition: "width 250ms ease",
            "&[data-active]": {
              width: 24,
            },
          },
        }}
        nextControlIcon={<FiArrowRight size={16} />}
        previousControlIcon={<FiArrowLeft size={16} />}
        height="auto"
      >
        {images.map((image) => {
          return (
            <Carousel.Slide key={image.directus_files_id.id}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "sm",
                  overflow: "hidden",
                  ":hover": {
                    cursor: "pointer",
                    "&>div": {
                      display: "block",
                      visibility: "visible",
                    },
                  },
                }}
              >
                <Image
                  src={`https://${web_config.cms_host}/assets/${image.directus_files_id.id}?key=small-gallery-image`}
                  radius="sm"
                />
                <Box
                  sx={{
                    display: "none",
                    visibility: "hidden",
                    position: "absolute",
                    background: "#0008",
                    width: "100%",
                    height: "100%",
                    left: 0,
                    top: 0,
                    borderRadius: "0.25rem",
                  }}
                >
                  <Text
                    size="xs"
                    sx={{
                      position: "absolute",
                      left: 16,
                      top: 16,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      color: "white",
                    }}
                  >
                    <FiCamera />
                    {image.directus_files_id.description}
                  </Text>
                </Box>
              </Box>
            </Carousel.Slide>
          );
        })}
      </Carousel>
    );
  };

  const RenderItineraryItem = ({ heading, content }: ItineraryItem) => {
    return (
      <Box>
        <Title size="h2" order={2} color="brand-red">
          {heading}
        </Title>
        <Text size="sm" dangerouslySetInnerHTML={{ __html: content }} />
      </Box>
    );
  };

  return (
    <>
      <Container>
        <Title color="brand-red">{heading}</Title>
      </Container>
      <Container>
        {cover_image && (
          <Image
            src={`https://${web_config.cms_host}/assets/${cover_image}?key=large-cover`}
            radius={4}
          />
        )}

        <RenderItineraryItemCarousel images={images} />
        <Text
          sx={{ flex: 1 }}
          dangerouslySetInnerHTML={{ __html: content }}
          className="page-content"
        />

        <Divider sx={{ margin: "16px 0px" }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 48,
          }}
        >
          {itinerary_list.map((item) => (
            <RenderItineraryItem {...item} key={item.id} />
          ))}
        </Box>
      </Container>
    </>
  );
};

export const query = {
  page_data: {
    model: "items/conference_itinerary",
    select: ["*", "images.directus_files_id.*"],
  },
  itinerary_list: {
    model: "items/conference_itinerary_list",
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

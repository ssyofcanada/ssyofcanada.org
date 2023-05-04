import React from "react";

import { Badge, Box, Drawer, Image, Text, Title } from "@mantine/core";
import { FiInstagram, FiLink, FiMail } from "react-icons/fi";

import { BaseCoverImage, SponsorTier, SponsorTierColor } from "@lib/shared";
import { web_config } from "@lib/config";

import { Link } from "@components/core";
import { useDisclosure } from "@mantine/hooks";

export type FeatureItem = BaseCoverImage & {
  cover_image: string;
  cover_image_caption?: string;
  name: string;
  email?: string;
  website_link?: string;
  social_instagram?: string;
  info?: string;
  tier?: number;
  date_created?: string;
  date_updated?: string;
  hide_link?: boolean;
};

export type FeatureListItemProps = {
  children?: React.ReactNode;
  item: FeatureItem;
  center?: boolean;
};

export const FeatureListItem = ({
  item: {
    cover_image,
    name,
    email,
    website_link,
    social_instagram,
    info,
    tier,
    hide_link = false,
  },
  center,
}: FeatureListItemProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  const FeatureDrawer = () => (
    <Drawer
      opened={opened}
      onClose={close}
      title={`${name}`}
      position="right"
      transitionProps={{
        transition: "slide-left",
        duration: 2000,
        timingFunction: "ease",
      }}
      sx={{
        a: {
          display: "inline-flex",
          alignItems: "center",
          gap: 2,
        },
      }}
    >
      <Image
        src={`https://${web_config.cms_host}/assets/${cover_image}?key=large-avatar`}
        radius="sm"
      />
      <Title size="h2" order={2} color="brand-red">
        {name}
      </Title>
      {/* <Title size="xs" order={3}>
        <Text size="xs">{roles.join(" | ")}</Text>
      </Title> */}
      <Text size="sm">{info}</Text>
      {email && (
        <Text size="sm" lineClamp={1}>
          <Link href={`mailto:${email}`}>
            <FiMail />
            {`Email ${name}`}
            {/* {email} */}
          </Link>
        </Text>
      )}
      {social_instagram && (
        <Text size="sm" lineClamp={1}>
          <Link href={`https://www.instagram.com/${social_instagram}/`}>
            <FiInstagram />
            {`${name}'s Instagram`}
            {/* {social_instagram} */}
          </Link>
        </Text>
      )}
      {website_link && !hide_link && (
        <Text size="sm" lineClamp={1}>
          <Link href={`https://${website_link}`}>
            <FiLink />
            {`${name}'s Website`}
            {/* {website_link} */}
          </Link>
        </Text>
      )}
    </Drawer>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: center ? "center" : "initial",
          height: 192,
        }}
      >
        {/* <Link href={`https://${website_link}`} sx={{ display: "block" }}> */}
        <Image
          src={`https://${web_config.cms_host}/assets/${cover_image}?key=small-logo`}
          radius="sm"
          fit="contain"
          width="auto"
          height={192}
          onClick={open}
        />
        {/* </Link> */}
      </Box>
      <Box
        mt={8}
        mb={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: center ? "center" : "initial",
          textAlign: center ? "center" : "initial",
          flexGrow: 1,
          minWidth: 256,
          a: {
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
          },
        }}
      >
        <Title size="md" order={3} color="brand-red">
          {name}
        </Title>
        {!!tier && tier > 1 && (
          <Badge
            variant="filled"
            radius="sm"
            color={SponsorTierColor[tier || 0]}
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              ":after": { content: `'${SponsorTier[tier]} Sponsor'` },
            }}
          />
        )}
        {!!tier && tier > 0 && (
          <Title size="md" order={3} color={SponsorTierColor[tier || 0]}>
            {`${SponsorTier[tier]} Sponsor`}
          </Title>
        )}
        {email && (
          <Text size="sm" lineClamp={1}>
            <Link href={`mailto:${email}`}>
              <FiMail />
              {`Email ${name}`}
              {/* {email} */}
            </Link>
          </Text>
        )}
        {social_instagram && (
          <Text size="sm" lineClamp={1}>
            <Link href={`https://www.instagram.com/${social_instagram}/`}>
              <FiInstagram />
              {`${name}'s Instagram`}
            </Link>
          </Text>
        )}{" "}
        {website_link && !hide_link && (
          <Text size="sm" lineClamp={1}>
            <Link href={`https://${website_link}`}>
              <FiLink />
              {`Their Website`}
              {/* {`${name}'s Website`} */}
              {/* {website_link} */}
            </Link>
          </Text>
        )}
        {/* {info && (
          <Text size="sm" lineClamp={2}>
            {info}
          </Text>
        )} */}
      </Box>
      <FeatureDrawer />
    </Box>
  );
};

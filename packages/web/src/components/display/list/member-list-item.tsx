import React from "react";

import { Box, Drawer, Image, Text, Title } from "@mantine/core";
import { FiInstagram, FiMail, FiStar } from "react-icons/fi/index.js";

import { BaseMemberListItem } from "@lib/shared";
import { web_config } from "@lib/config";

import { Link } from "@components/core";
import { useDisclosure } from "@mantine/hooks";

export type MemberListItemProps = {
  children?: React.ReactNode;
  item: BaseMemberListItem;
};

export const MemberListItem = ({
  item: {
    cover_image,
    first_name,
    last_name,
    title,
    email,
    info,
    roles,
    social_instagram,
  },
}: MemberListItemProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  const MemberDrawer = () => (
    <Drawer
      opened={opened}
      onClose={close}
      title={`${first_name} ${last_name}`}
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
        {first_name} {last_name}
      </Title>
      <Title size="xs" order={3}>
        <Text size="xs">{roles.join(" | ")}</Text>
      </Title>
      <Text size="sm">{info}</Text>
      {email && (
        <Text size="sm">
          <Link href={`mailto:${email}`}>
            <FiMail />
            {`Email ${first_name}`}
          </Link>
        </Text>
      )}
      {social_instagram && (
        <Text size="sm">
          <Link href={`https://www.instagram.com/${social_instagram}/`}>
            <FiInstagram />
            {`${first_name}'s Instagram`}
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
        onClick={open}
      >
        <Image
          src={`https://${web_config.cms_host}/assets/${cover_image}?key=large-avatar`}
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
          {roles && (
            <Text
              size="sm"
              sx={{
                position: "absolute",
                left: 8,
                top: 8,
                div: {
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "white",
                },
              }}
            >
              {roles.map((role) => (
                <Box
                  key={role}
                  sx={{
                    ":after": {
                      content: `"${role}"`,
                    },
                  }}
                >
                  <FiStar />
                </Box>
              ))}
            </Text>
          )}
        </Box>
      </Box>
      <Box
        mt={8}
        mb={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          a: {
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
          },
        }}
      >
        <Title
          size="md"
          order={2}
          color="brand-red"
          weight="bold"
          sx={{ ":hover": { cursor: "pointer" } }}
          onClick={open}
        >
          {first_name} {last_name}
        </Title>
        <Title size="md" order={3} weight="bold">
          {title}
        </Title>
        <Title size="xs" order={4}>
          <Text size="xs">{roles.join(" | ")}</Text>
        </Title>
        {email && (
          <Text size="sm">
            <Link href={`mailto:${email}`}>
              <FiMail />
              {`Email ${first_name}`}
            </Link>
          </Text>
        )}
        {social_instagram && (
          <Text size="sm">
            <Link href={`https://www.instagram.com/${social_instagram}/`}>
              <FiInstagram />
              {`${first_name}'s Instagram`}
            </Link>
          </Text>
        )}
      </Box>
      <MemberDrawer />
    </Box>
  );
};

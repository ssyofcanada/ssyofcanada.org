import React from "react";

import { Box } from "@mantine/core";

import { BaseMemberListItem } from "@lib/shared";

import { MemberListItem } from ".";

export type MemberListProps = {
  children?: React.ReactNode;
  items: BaseMemberListItem[];
};

export const MemberList = ({ items }: MemberListProps) => {
  return (
    <Box
      sx={{
        display: "grid",
        "grid-template-columns": `repeat(3, 1fr)`,
        columnGap: 8,
        rowGap: 12,
        "@media (max-width: 980px)": {
          "grid-template-columns": `repeat(2, 1fr)`,
        },
        "@media (max-width: 720px)": {
          "grid-template-columns": `repeat(1, 1fr)`,
        },
      }}
    >
      {items.map((item) => (
        <MemberListItem key={item.id} item={item} />
      ))}
    </Box>
  );
};

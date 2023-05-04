import React from "react";

import { Box } from "@mantine/core";

export type BaseListProps<T extends { [x: string]: unknown } = { id: string }> =
  {
    children?: React.ReactNode;
    item_type: React.FC<{ item: T; center?: boolean }>;
    items: T[];
    id_key?: string;
    center?: boolean;
  };

export const BaseList = <T extends { [x: string]: unknown } = { id: string }>({
  item_type,
  items,
  id_key = "id",
  center = false,
}: BaseListProps<T>) => {
  const ListItem = item_type;
  return (
    <Box
      sx={{
        display: "grid",
        // "grid-template-columns": `repeat(3, 1fr)`,
        gridTemplateColumns: `repeat(4, 1fr)`,
        columnGap: 8,
        rowGap: 24,
        "@media (max-width: 980px)": {
          // "grid-template-columns": `repeat(2, 1fr)`,
          gridTemplateColumns: `repeat(3, 1fr)`,
        },
        "@media (max-width: 720px)": {
          // "grid-template-columns": `repeat(1, 1fr)`,
          gridTemplateColumns: `repeat(2, 1fr)`,
        },
        "@media (max-width: 480px)": {
          // "grid-template-columns": `repeat(1, 1fr)`,
          gridTemplateColumns: `repeat(1, 1fr)`,
        },
      }}
    >
      {items.map((item) => {
        const key = item[id_key] as string;
        return <ListItem key={key} item={item} center={center} />;
      })}
    </Box>
  );
};

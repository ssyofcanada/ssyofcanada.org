import React, { useState } from "react";

import { MdAlternateEmail, MdError, MdPerson } from "react-icons/md/index.js";
import { Alert, Box, Button, TextInput } from "@mantine/core";

import { web_config } from "@lib/config";
import { Stande } from "@lib/stande";

export const NewsletterForm = () => {
  const [formSuccess, setFormSuccess] = useState<boolean | null>(null);

  const { post } = new Stande({
    base_url: web_config.cms_host,
  });

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.elements.namedItem("email") as HTMLInputElement;
    const first_name = form.elements.namedItem(
      "first_name"
    ) as HTMLInputElement;

    const response = await post("items/marketing_email_list", {
      body: {
        email: email.value,
        first_name: first_name.value,
      },
    });

    if (response.ok) setFormSuccess(true);
    else setFormSuccess(false);
  };

  return (
    <>
      <form onSubmit={submitForm}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            gap: 4,
            "@media (max-width: 680px)": {
              flexDirection: "column",
              alignItems: "stretch",
            },
          }}
        >
          <TextInput
            icon={<MdPerson />}
            placeholder="First Name"
            name="first_name"
            autoComplete="given-name"
            sx={{ flexGrow: 1 }}
            required
          />
          <TextInput
            icon={<MdAlternateEmail />}
            placeholder="Email"
            name="email"
            autoComplete="email"
            sx={{ flexGrow: 1 }}
            required
          />
          <Button type="submit">Subscribe</Button>
        </Box>
      </form>
      {typeof formSuccess === "boolean" &&
        (formSuccess ? (
          <Alert icon={<MdError size="1rem" />} title="Sweet!" color="green">
            You have been successfully subscribed to our newsletter!
          </Alert>
        ) : (
          <Alert icon={<MdError size="1rem" />} title="Bummer!" color="red">
            There was an error subscribing you to our newsletter. Please try
            again later.
          </Alert>
        ))}
    </>
  );
};

import { Stande } from "@lib/stande";
import { web_config } from "@lib/config";

export const contentStore = () => {
  const stande = new Stande({
    base_url: web_config.cms_host,
    api_token: web_config.directus.public_api_token,
    api_token_type: "Bearer",
  });

  return {
    ...stande,
  };
};

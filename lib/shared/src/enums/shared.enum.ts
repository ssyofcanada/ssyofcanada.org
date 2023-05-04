export enum SponsorTier {
  IN_KIND = 0,
  BRONZE = 1,
  SILVER = 2,
  GOLD = 3,
}

export const SponsorTierColor: { [x: number]: string } = {
  [SponsorTier.IN_KIND]: "black",
  [SponsorTier.BRONZE]: "black",
  [SponsorTier.SILVER]: "gray",
  [SponsorTier.GOLD]: "yellow",
};

export const parseAddress = (address: string): `0x${string}` | undefined => {
  if (!address) return undefined;
  if (address.length === 42) return `0x${address.slice(2)}`;
  return address as `0x${string}`;
};

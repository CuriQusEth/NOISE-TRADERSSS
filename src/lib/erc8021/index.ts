export const ATTRIBUTION_CODE = "bc_3purwj36";

/**
 * ERC-8021: Asset Attribution Standard
 * This utility generates the proper calldata suffix or attribution 
 * payloads for transactions routing on Base.
 */
export function generateAttributionPayload(builderCode?: string, extraData?: string) {
  const finalCode = builderCode || ATTRIBUTION_CODE;
  // Dummy implementation for demo purposes
  return `0x8021${Buffer.from(finalCode).toString('hex')}${extraData ? Buffer.from(extraData).toString('hex') : ''}`;
}

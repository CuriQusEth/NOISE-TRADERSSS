import { http, createConfig } from 'wagmi';
import { base } from 'wagmi/chains';
import { injected, safe } from 'wagmi/connectors';

/**
 * Base Mainnet Configuration (Denim Upgrade)
 * Denim replaced Flashblocks with canonical 200ms blocks on Base Mainnet.
 * Using canonical Base Mainnet RPC endpoint with 200ms polling interval.
 */
export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    injected(),
    safe(),
  ],
  transports: {
    [base.id]: http('https://mainnet.base.org', {
      batch: true,
      retryCount: 3,
    }),
  },
  pollingInterval: 200, // 200ms native block cadence on Denim
});


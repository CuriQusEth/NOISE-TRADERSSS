import { http, createConfig } from 'wagmi';
import { base } from 'wagmi/chains';
import { injected, safe, walletConnect } from 'wagmi/connectors';

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    injected(),
    safe(),
  ],
  transports: {
    [base.id]: http(),
  },
});

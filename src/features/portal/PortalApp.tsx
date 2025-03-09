import React from "react";

import { PortalProvider } from "./easter/lib/PortalProvider";
import { Ocean } from "features/world/ui/Ocean";

import { WalletProvider } from "features/wallet/WalletProvider";

import { Portal } from "./easter/Portal";

export const PortalApp: React.FC = () => {
  return (
    // WalletProvider - if you need to connect to a players wallet
    <WalletProvider>
      {/* PortalProvider - gives you access to a xstate machine which handles state management */}
      <PortalProvider>
        <Ocean>
          <Portal />
        </Ocean>
      </PortalProvider>
    </WalletProvider>
  );
};

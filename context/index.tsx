import React from "react";
import { StationsProvider, StationsContext } from "./StationsContext";
import {
  NotifierSetupProvider,
  NotifierSetupContext,
} from "./NotifierSetupContext";

export { StationsContext, NotifierSetupContext };

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <NotifierSetupProvider>
      <StationsProvider>{children}</StationsProvider>
    </NotifierSetupProvider>
  );
};

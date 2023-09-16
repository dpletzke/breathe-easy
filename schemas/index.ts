import Realm from "realm";
import { createRealmContext } from "@realm/react";
import { Notifier } from "./NotifierSchema";

const realmConfig: Realm.Configuration = {
  schema: [Notifier],
  deleteRealmIfMigrationNeeded: true,
};

export const { RealmProvider, useRealm, useObject, useQuery } =
  createRealmContext(realmConfig);

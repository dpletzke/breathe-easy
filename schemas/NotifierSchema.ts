import { createRealmContext } from "@realm/react";
import Realm, { BSON } from "realm";

export class Notifier extends Realm.Object<Notifier> {
  _id!: Realm.BSON.ObjectId;
  stationId!: string;
  threshold!: number;

  static schema = {
    name: "Notifier",
    properties: {
      _id: { type: "objectId", default: () => new BSON.ObjectId() },
      stationId: "string",
      threshold: "int",
    },
    primaryKey: "_id",
  };
}

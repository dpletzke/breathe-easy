import { createRealmContext } from "@realm/react";
import Realm from "realm";

export class Notifier extends Realm.Object<Notifier> {
  _id!: Realm.BSON.ObjectId;
  stationId!: string;
  userid!: string;
  threshold!: number;

  static schema = {
    name: "Notifier",
    properties: {
      _id: "objectId",
      stationId: "string",
    },
    primaryKey: "_id",
  };
}

import { useCallback, useEffect } from "react";
import { useObject, useRealm, useQuery } from "../schemas";
import { Notifier } from "../schemas/NotifierSchema";
import { useUser } from "@realm/react";

export const useDb = () => {
  const realm = useRealm();
  const notifiers = useQuery(Notifier).sorted("_id");
  const user = useUser();

  useEffect(() => {
    realm.subscriptions.update((mutableSubs) => {
      mutableSubs.add(realm.objects(Notifier));
    });
  }, [realm, user]);

  const createNotifier = useCallback(
    (stationId: string, threshold: number): void => {
      if (!stationId || !threshold) {
        return;
      }
      realm.write(() => {
        realm.create(Notifier, {
          stationId,
          threshold,
        });
      });
    },
    [realm]
  );

  const getNotifiers = useCallback(() => {
    return realm.objects<Notifier>(Notifier.name);
  }, [realm]);

  const getNotifierById = useCallback(
    (id: string) => {
      return useObject<Notifier>(Notifier.name, id);
    },
    [realm]
  );

  const deleteNotifier = useCallback(
    (id: string) => {
      const notifier = getNotifierById(id);
      realm.write(() => {
        realm.delete(notifier);
      });
    },
    [realm]
  );

  const deleteAllNotifiers = useCallback(() => {
    realm.write(() => {
      realm.delete(getNotifiers());
    });
  }, [realm]);

  return {
    realm,
    user,
    notifiers,
    createNotifier,
    deleteNotifier,
    deleteAllNotifiers,
  };
};

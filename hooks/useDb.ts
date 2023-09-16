import { useCallback } from "react";
import { useObject, useRealm } from "../schemas";
import { Notifier } from "../schemas/NotifierSchema";

export const useDb = () => {
  const db = useRealm();

  const createNotifier = useCallback(
    (stationId: string, threshold: number): void => {
      if (!stationId || !threshold) {
        return;
      }
      db.write(() => {
        db.create(Notifier, {
          stationId,
          threshold,
        });
      });
    },
    [db]
  );

  const getNotifiers = useCallback(() => {
    return db.objects<Notifier>(Notifier.name);
  }, [db]);

  const getNotifierById = useCallback(
    (id: string) => {
      return useObject<Notifier>(Notifier.name, id);
    },
    [db]
  );

  const deleteNotifier = useCallback(
    (id: string) => {
      const notifier = getNotifierById(id);
      db.write(() => {
        db.delete(notifier);
      });
    },
    [db]
  );

  const deleteAllNotifiers = useCallback(() => {
    db.write(() => {
      db.delete(getNotifiers());
    });
  }, [db]);

  return {
    createNotifier,
    getNotifiers,
    getNotifierById,
    deleteNotifier,
    deleteAllNotifiers,
  };
};

import Dexie, { type Table } from "dexie";
import type { Observation } from "@/lib/types";

class TapantiDB extends Dexie {
  observations!: Table<Observation, number>;

  constructor() {
    super("tapanti_fauna_db");

    this.version(1).stores({
      observations: "++id,&[studentName+speciesId],speciesId,studentName,timestamp",
    });
  }
}

export const db = new TapantiDB();

export const markObservation = async (observation: Observation) => {
  try {
    await db.observations.add(observation);
    return { inserted: true };
  } catch (error) {
    if (error instanceof Dexie.ConstraintError) {
      return { inserted: false };
    }

    throw error;
  }
};

export const getObservationsByStudent = async (studentName: string) =>
  db.observations.where("studentName").equals(studentName).toArray();

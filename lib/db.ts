import Dexie, { type Table } from "dexie";
import type { Observation } from "@/lib/types";

class TapantiDB extends Dexie {
  observations!: Table<Observation, number>;

  constructor() {
    super("tapanti_fauna_db");

    this.version(1).stores({
      observations: "++id,speciesId,studentName,timestamp,[studentName+speciesId]",
    });
  }
}

export const db = new TapantiDB();

export const markObservation = async (observation: Observation) => {
  const existing = await db.observations
    .where("[studentName+speciesId]")
    .equals([observation.studentName, observation.speciesId])
    .first();

  if (!existing) {
    await db.observations.add(observation);
  }
};

export const getObservationsByStudent = async (studentName: string) =>
  db.observations.where("studentName").equals(studentName).toArray();

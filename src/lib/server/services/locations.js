import { db } from "../db/db"
import { locationImportanceTypes, locations, locationTypes } from "../db/schema"
import { eq } from "drizzle-orm";

export const getLocation = () => {
    // TODO:  userId based availableLocations pick
}

export const getAllLocations = async () => {
    return db
    .select({
        id: locations.id,
        name: locations.name,
        importance: locationImportanceTypes.value,
        description: locations.description,
        coords: {x:locations.coordsX,y:locations.coordsY},
        color: locations.color_hex,
        type: {id:locations.locationTypeId,name:locationTypes.name},
        is_base: locations.isBase
    })
    .from(locations)
    .innerJoin(locationImportanceTypes, eq(locationImportanceTypes.id, locations.importanceTypeId))
    .innerJoin(locationTypes, eq(locationTypes.id, locations.locationTypeId))

}

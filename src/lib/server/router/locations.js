import { db } from "../db/db"
import { locationImportanceTypes, locations } from "../db/schema"
import { eq } from "drizzle-orm";

export const getLocation = () => {
    
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
        type: locations.locationTypeId,
        is_base: locations.isBase
    })
    .from(locations)
    .innerJoin(locationImportanceTypes, eq(locationImportanceTypes.id, locations.importanceTypeId))

}

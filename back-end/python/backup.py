import pandas as pd
import json

df = pd.read_csv("st_arceau_p.csv", sep=";")


df = df.drop(
    ["Geo Shape", "gid", "geom_o", "geom_err", "typologie", "cdate", "mdate", "insee"],
    axis=1,
)

# [{"_id":index,"nombre":row['nombre'],"geo_x":row['Geo Point'].split(',')[0],"geo_y":row['Geo Point'].split(',')[1]} for index,row in df.iterrows()]
with open("cleaned_data.json", "w") as f:
    json.dump(
        [
            {
                "_id": index,
                "nombre": row["nombre"],
                "geo_x": row["Geo Point"].split(",")[0],
                "geo_y": row["Geo Point"].split(",")[1],
            }
            for index, row in df.iterrows()
        ],
        f,
    )

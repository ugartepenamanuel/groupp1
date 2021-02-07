

//....Selecciona el precio menor igual de precio ventas lo agrupamos por marca y modelo, el project calcula el IVA, seleccionamos el IVA mayor igual a 1000 y lo ordenamos el totalIVA descendente ....//



      db.coche.aggregate([
            { $match: { $expr: { $lte: [ "$Precio" , "$Precio_ventas" ] } }},
            { $group: { _id: { marca: "$Marca", modelo: "$Modelo"}, precio:{$avg: "$Precio_ventas"}, año:{$avg:"$Año"}}} ,
            { $project: {
                _id:1,
                IVA:  { $round:  { $multiply: ["$precio", 0.21 ]}},
                totalIVA:   { $multiply: ["$precio", 1.21]} 
        
            }
            },
         
            {$match: {IVA:{$gte:1000}}},
            { $sort: { totalIVA: -1 } }
            
            
         ]);
db.air_alliances.aggregate(
  [
    {
      $lookup: {
        from: "air_routes",
        localField: "airlines",
        foreignField: "airline.name",
        as: "partnerships",
      },
    },
    { $unwind: "$partnerships" },
    {
      $match: { "partnerships.airplane": { $in: ["747", "380"] } },
    },
    {
      $group: {
        _id: "$name",
        totalRotas: { $sum: 1 },
      },
    },
    { $sort: { totalRotas: -1 } },
    { $limit: 1 },
  ],
);

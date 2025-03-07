db.trips.aggregate(
  [
    {
      $match: {
        startTime: {
          $gte: new Date("2016-03-10"),
          $lte: new Date("2016-03-11"),
        },
      },
    },
    {
      $group: {
        _id: null,
        duracaoMediaEmMinutos: {
          $avg: {
            $divide: [{
              $subtract: ["$stopTime", "$startTime"],
            }, 60000],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
      },
    },
  ],
);

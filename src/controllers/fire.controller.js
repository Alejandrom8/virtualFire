const { getFires } = require('../models/getFires')

exports.getLocalFires = function (req, res) {
  let { lat, long, radius } = req.query
  lat = parseFloat(lat)
  long = parseFloat(long)
  radius = parseFloat(radius)
  console.log(lat, long, radius, typeof long)

  getFires(lat, long, radius)
    .then(events => {
      res.status(200).json({ success: true, data: events })
    })
    .catch(error => {
      res.status(500).json({ success: false, errors: error })
    })
}

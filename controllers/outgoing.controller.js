const outModel = require('../models/outgoing.model');

module.exports = {
  getById: function (req, res, next) {
    console.log(req.body);
    outModel.findById(req.params.shipmentId, function (err, shipmentInfo) {
      if (err) {
        next(err);
      } else {
        res.json({ status: "success", message: "shipment found!!!", data: { shipment: shipmentInfo } });
      }
    });
  },
  getShipmentDriver: function (req, res, next) {
    console.log(req.params);
    outModel.find({ driver: req.params.shipmentDriver }, function (err, shipmentInfo) {
      if (err) {
        next(err);
      } else {

        res.json({ status: "success", message: "shipment found!!!", shipment: shipmentInfo });
      }
    });
  },
  create: function (req, res, next) {
    outModel.create({
      lat: req.body.lat,
      lng: req.body.lng,
      street: req.body.street,
      city: req.body.city,
      situation: req.body.situation,
      vehicle: req.body.vehicle,
      driver: req.body.driver,
      date: req.body.date,
      output_type: req.body.output_type,
      obs: req.body.obs,   
    },
      function (err, result) {
        if (err) {
          if (err.code == 11000)
            res.status(422).send(['An error ocurred!']);
          //res.json({status: "error", message: "Test!!!", data: err});
          return next(err);
        }
        res.json({ status: "success", message: "Shipment added successfully!!!", data: result });

      });
  },
  getAll: function (req, res, next) {
    let shipmentList = [];
    outModel.find({}, function (err, shipments) {
      if (err) {
        next(err);
      } else {
        for (let shipment of shipments) {
          shipmentList.push({
            id: shipment._id, origin_lng: shipment.origin_lng, origin_lat: shipment.origin_lat,
            dest_lat: shipment.dest_lat, dest_lng: shipment.dest_lng,
            addressor: shipment.addressor, addressde: shipment.addressde,
            customer: shipment.customer, manufacturer: shipment.manufacturer,
            products: shipment.products, truck: shipment.truck,
            driver: shipment.driver, date: shipment.date,
            status: shipment.status
          });
        }
        res.json({ status: "success", message: "Shipment list found!!!", data: { shipments: shipmentList } });

      }
    });
  },
  updateById: function (req, res, next) {
    shipmentModel.findByIdAndUpdate(req.params.shipmentId, { status: req.body.status },
      function (err, shipInfo) {
        if (err) {
          res.status(422).send(['An Error Ocurred']);
          return next(err);
        }
        else {
          res.json({ status: "success", message: "Shipment updated successfully!!!", data: shipInfo });
        }
      });
  }
}


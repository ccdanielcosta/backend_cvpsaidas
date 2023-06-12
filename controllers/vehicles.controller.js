const truckModel = require('../models/vehicles.model');

module.exports = {
 getById: function(req, res, next) {
  console.log(req.body);
  truckModel.findById(req.params.truckId, function(err, truckInfo){
   if (err) {
    next(err);
   } else {
    res.json({status:"success", message: "Trucks found!!!", data:{trucks: truckInfo}});
   }
  });
 },
getAll: function(req, res, next) {
  let trucksList = [];
truckModel.find({}, function(err, trucks){
   if (err){
    next(err);
   } else{
    for (let truck of trucks) {
     trucksList.push({id: truck._id, license_plate: truck.license_plate, year: truck.year, truck_type: truck.truck_type, 
      company: truck.company, brand: truck.brand, model: truck.model, weight: truck.weight,width: truck.width, height: truck.height, lenght: truck.lenght});
    }
    res.json({status:"success", message: "Trucks list found!!!", data:{trucks: trucksList}});
       
   }
});
 },
 //NAO ESQUECER !!
updateById: function(req, res, next) {
  truckModel.findByIdAndUpdate(req.params.truckId,{license_plate: req.body.license_plate, year: req.body.year, 
     truck_type:req.body.truck_type,company: req.body.company, brand:req.body.brand, model:req.body.model, 
     weight:req.body.weight,width:req.body.width,height:req.body.height, lenght:req.body.lenght}, 
    function(err, truckInfo){
  if(err){
      res.status(422).send(['Plate already exists']);
      return next(err);
    }
    else {
      res.json({status:"success", message: "Truck updated successfully!!!", data:truckInfo});
   }
  });
 },
deleteById: function(req, res, next) {
  truckModel.findByIdAndDelete(req.params.truckId, 
    function(err, truckInfo){
      if(err){
        res.status(422).send(['Not found user']);
        return next(err);
      }
      else {
        res.json({status:"success", message: "Truck deleted successfully!!!", data:null});
      }
      });
 },
create: function(req, res, next) {
  truckModel.create({ license_plate: req.body.license_plate,
                      year:req.body.year,
                      truck_type: req.body.truck_type, 
                      company: req.body.company,
                      brand: req.body.brand, 
                      model: req.body.model, 
                      weight: req.body.weight,
                      width: req.body.width,
                      height: req.body.height,
                      lenght: req.body.lenght  }, 
        function (err, result) {
                if (err){
                  if(err.code == 11000)
                    res.status(422).send(['Duplicate matricula']);   
                    //res.json({status: "error", message: "Test!!!", data: err});
                return next(err);
                } 
                res.json({status: "success", message: "Truck added successfully!!!", data: result});
                
              });
 },
}
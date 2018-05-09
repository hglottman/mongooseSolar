var mongoose = require('mongoose')
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/populationEx');

var solarSystemSchema = new Schema({
    planets: [{ type: Schema.Types.ObjectId, ref: 'planet'}],
    starName: String
});

var visitorSchema = new Schema({
    name: String,
    homePlanet: { type: Schema.Types.ObjectId, ref: 'planet'},
    visitedPlanets: [{ type: Schema.Types.ObjectId, ref: 'planet'}]
});

var planetSchema = new Schema({
    name: String,
    system: { type: Schema.Types.ObjectId, ref: 'solarSystems'},
    visitors: [{type: Schema.Types.ObjectId, ref: 'visitor'}]
});

var SolarSystemS = mongoose.model('solarSystems', solarSystemSchema);
var Visitor = mongoose.model('visitor', visitorSchema);
var Planet = mongoose.model('planet', planetSchema);

var solar1 = new SolarSystemS ({planets: [], starName: "Sun"});
var venus = new Planet ({name: 'Venus', system: solar1._id, visitors: [] });
var mars = new Planet ({name: 'Mars', system: solar1._id, visitors: [] });
var alien = new Visitor ({name: 'Alien', homePlanet: venus._id, visitedPlanet: [mars._id]})

alien.save();
mars.save();
venus.save();
venus.visitors.push(alien)
mars.visitors.push(alien);
solar1.save();
solar1.planets.push(mars);
solar1.planets.push(venus);



// SolarSystemS.findOne({starName: 'Sun'}).populate({path:'planets', populate:{path:'visitors'}}).exec(function(err, system){
//     console.log(system.planets[0].visitors[0].name)
// })

Planet.findOne({name: 'Venus'}).populate({path: 'visitors'}).exec(function(err,planet){
    for(var i = 0; i < venus.visitors.length; i++){
        console.log(venus.visitors[i].name);
    }
});




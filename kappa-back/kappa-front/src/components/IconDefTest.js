import L from 'leaflet';


var VarIcon = L.Icon.extend({
    options: {
    iconSize: [35, 35],
    }

});

var recicling = new VarIcon({iconUrl: '../assets/images/recicle.png'}),
    farmacy = new VarIcon({iconUrl: '../assets/images/medicine.png'}),

export default function MainComponent(){
        return(
            <h1>Holaa</h1>
        )
    }
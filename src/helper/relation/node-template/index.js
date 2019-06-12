
import carNode from './carNode'
export default function($, go, options = {}) {
    let map = new go.Map();
    map.add('car', carNode($, go, options))
    return map;
}
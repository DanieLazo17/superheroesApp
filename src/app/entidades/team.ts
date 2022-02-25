import { Appearance } from "./appearance";
import { Powerstats } from "./powerstats";

export class Team {
    powerstats:Powerstats = new Powerstats();
    height:number=0.0;
    weight:number=0.0;
    averageHeight:number=0.0;
    averageWeight:number=0.0;
    badAlignment:number=0;
    goodAlignment:number=0;
}

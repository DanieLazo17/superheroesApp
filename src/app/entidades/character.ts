import { Appearance } from "./appearance";
import { Biography } from "./biography";
import { Connections } from "./connections";
import { Image } from "./image";
import { Powerstats } from "./powerstats";
import { Work } from "./work";

export class Character {
    id!:string;
    name!:string;
    powerstats!:Powerstats;
    biography!:Biography;
    appearance!:Appearance;
    work!:Work;
    connections!:Connections;
    image!:Image;
}

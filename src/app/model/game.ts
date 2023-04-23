import { Team } from "./team"

export class Game {
    id?: number;
    date?: Date;
    home_team?: Team;
    home_team_score?: number;
    period?: number;
    postseason?: boolean;
    season?: number;
    status?: string;
    time?: string;
    visitor_team?: Team;
    visitor_team_score?: number;   
}

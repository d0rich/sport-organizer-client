import {Sport, User, Group} from "@/classes";

export class Section {
    constructor(section = {ID: null, Groups: [], Trainers: [], User: new User(), 'Sport-type': new Sport()}) {
        this.ID = section.ID
        this.Name = section.Name
        this.Description = section.Description
        this['Sport-type'] = new Sport(section['Sport-type'])
        this.User = new User(section.User)
        this.UserID = section.UserID
        this.Groups = []
        if(section.Groups){
            section.Groups.forEach(group => {
                this.Groups.push(new Group(group))
            })
        }
        this.Trainers = []
        if(section.Trainers){
            section.Trainers.forEach(trainer => {
                this.Trainers.push(new User(trainer))
            })
        }
    }
}

import {Section, User, AgeType} from "@/classes";

export class Group{
    constructor(group = {ID: null, Section: new Section(), 'Age-type': new AgeType(), Trainers: [], Trainees: []}) {
        this.ID = group.ID
        this.Name = group.Name
        this.Description = group.Description
        this.Section = new Section( group.Section)
        this.AgeType = new AgeType(group['Age-type'])

        this.Trainers = []
        if(group.Trainers){
            group.Trainers.forEach(user => {
                this.Trainers.push(new User(user))
            })
        }
        this.Trainees = []
        if(group.Trainees){
            group.Trainees.forEach(user => {
                this.Trainees.push(new User(user))
            })
        }
    }
}

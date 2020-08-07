import {Sport, Gender, Group, Section} from "@/classes";

export class User {
    constructor(user = {ID: null, Sports: [], Sections: [], TrainerIn:[], TraineeIn: []})
    {
        this.ID = user.ID
        this.Login = user.Login
        this.ActivateCode = user.ActivateCode
        this.Name = user.Name
        this.Surname = user.Surname
        this.Birthdate = user.Birthdate
        this.Age = user.Age
        this.Gender = new Gender(user['Gender-type'])
        this.Email = user.Email
        this.PhoneNumber = user.PhoneNumber
        this.Height = user.Height
        this.Weight = user.Weight

        this.Sports = []
        if(user.Sports){
            user.Sports.forEach(sport => {
                this.Sports.push(new Sport(sport))
            })
        }
        this.Sections = []
        if(user.Sections){
            user.Sections.forEach(sec =>{
                this.Sections.push(new Section(sec))
            })
        }
        this.TrainerIn = []
        if(user.TrainerIn){
            user.TrainerIn.forEach(group => {
                this.TrainerIn.push(group)
            })
        }
        this.TraineeIn = []
        if(user.TraineeIn){
            user.TraineeIn.forEach(group => {
                this.TraineeIn.push(new Group(group))
            })
        }
    }
}

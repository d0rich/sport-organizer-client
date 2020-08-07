export class AgeType{
    constructor(age_type = {ID: null, Age_range: [{value: 0 }, {value:99}]}) {
        this.ID = age_type.ID
        this.Age_range = [age_type.Age_range[0].value, age_type.Age_range[1].value]
        this.ItemName = age_type.ItemName
        this.UserID = age_type.UserID
    }
}

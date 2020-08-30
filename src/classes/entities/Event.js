import {EventType, Group} from "@/classes";

export class Event{
    constructor(event = { ID: null, Groups: [], TimeRange: [ {value: new Date() }, {value: new Date() } ] }) {
        this.ID = event.ID
        this.Name = event.Name
        this.Description = event.Description || ''
        this.TimeRange = [event.TimeRange[0].value, event.TimeRange[1].value]
        this.Timed = event.Timed
        this.EventTypeID = event.EventTypeID
        this['Event-type'] = new EventType(event['Event-type'])
        this.Groups = []
        if(event.Groups){
            event.Groups.forEach(group => {
                this.Groups.push(new Group(group))
            })
        }
    }
}

import {Event} from '@/classes'

export class ClientEvent{
    constructor( event = new Event() ) {
        this.name = event.Name
        this.start = new Date(event.TimeRange[0].value)
        this.end = new Date(event.TimeRange[1].value)
    }
}

export interface Activity {
    a_no: number,
    a_description: string,
    dte: string,
}

export interface User {
    uid: number,
    first_name: string,
    last_name: string,
    dob: string,
    socials: string,
    email: string,
    phone: string,
}

export interface Trip {
    tid: number,
    lid: number,
    city: string,
    c_name: string,
    start_date: string,
    end_date: string,
    bio: string,
    itinerary: Activity[],
}

export interface ConnectData {
    trip: Trip,
    pastTrips: Trip[],
    users: User[],
}


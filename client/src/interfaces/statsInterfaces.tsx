export interface PopDestQuery {
    minAge?: number,
    maxAge?: number,
    gender?: 'm' | 'f' | 'x',
}

export interface PopDest {
    lid: number,
    city: string,
    c_name: string,
    trip_count: number,
}

export interface Option {
    value: string,
    option: string,
}

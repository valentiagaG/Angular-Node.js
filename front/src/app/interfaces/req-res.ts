// Generated by https://quicktype.io

export interface AttractionsList {
    error:  boolean;
    status: number;
    body:   Attraction[];
}

export interface Attraction {
    name:         string;
    address:      string;
    accesibility: number;
    aimedTo:      string;
    danger:       number;
    idAttraction: number;
}

// Users
// Generated by https://quicktype.io

export interface UserResponse {
    error:  boolean;
    status: number;
    body:   User[];
}

export interface User {
    id:     number;
    name:   string;
    activo: number;
    roles:  string;
}


//Hotels
export interface HotelsList {
    error:  boolean;
    status: number;
    body:   Hotel[];
}

export interface Hotel {
    name:        string;
    id:          number;
    description: string;
    address:     string;
    punt:        number;
    img:         string;
}


export type TravelExprerience = {
    title:string,
    address:string
    category:string,
    location:[number,number]
    plan:"PAID"|"FREE";
    publishTime:Date|null,
    body:string
    isPublished:boolean
}
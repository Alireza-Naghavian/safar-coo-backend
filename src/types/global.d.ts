export interface CustomErr extends Error{
    status?:number,
    data?:any
}
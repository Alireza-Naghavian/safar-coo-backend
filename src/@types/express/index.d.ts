import { Usertype } from "../user.t";
declare global {
  namespace Express{
    interface Request{
      user:Usertype
    }
  }
}
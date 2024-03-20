import { Request } from "express"
import { userType } from "../types/userType"
export default interface CustomRequest extends Request {
    user: userType
}

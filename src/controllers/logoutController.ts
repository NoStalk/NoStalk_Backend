import { Request, Response } from "express"

const logoutController = (req: Request, res: Response) => {
    res.clearCookie("refreshToken");
    res.status(200).send("Logged out");
}


export default logoutController;
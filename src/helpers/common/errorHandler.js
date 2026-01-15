import CustomError from "../errors/CustomError.js";

export function errorHandler(err, req, res, next) {
    console.log(err);
    if(err instanceof CustomError) {
        return res
                .status(200)
                .json({
                    success: true,
                    data: err.message,
                    code: err.customCode
                })
    }
    res.status(500)
        .json({
            success: false,
            data: err.message || "Internal Server Error",
            code: "RFL500"
        })
}
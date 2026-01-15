export default function response(data, res) {
    return res
    .status(200)
    .json({
        success: true,
        data: data
    });
}
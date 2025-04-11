const logoutController = async(req, res)=>{
    res.clearCookie("jwtToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
}
module.exports = logoutController
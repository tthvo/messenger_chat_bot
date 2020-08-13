let getHomepage = (req, res) => {
    return res.render("homepage.ejs");
};

let getFacebookUserProfile = (req, res) => {
    return res.render("profile.ejs");

};

let setUpUserFacebookProfile = (reg, res) => {
    return res.status(200).json({
        message: "Working"

    });

};

export default {
    getHomepage,
    getFacebookUserProfile,
    setUpUserFacebookProfile
};
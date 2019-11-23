var Language = require('../Models/Language');
var debug = require('debug')('rest-api:language_controller');

// Search a one language y database
module.exports.getOne = (req, res, next) => {
    debug("Search language", req.params);
    User.findOne({
            languageName: req.params.languageName
        }, "-password -login_count")
        .then((foundLanguage) => {
            debug("Found User", foundLanguage);
            if (foundUser)
                return res.status(200).json(foundLanguage);
            else
                return res.status(400).json(null)
        })
        .catch(err => {
            next(err);
        });
}

module.exports.getAll = (req, res, next) => {
    var perPage = Number(req.query.size) || 10,
        page = req.query.page > 0 ? req.query.page : 0;

    var sortProperty = req.query.sortby || "createdAt",
        sort = req.query.sort || "desc";

    debug("Usert List", {
        size: perPage,
        page,
        sortby: sortProperty,
        sort
    });

    Language.find({}, "-password -login_count")
        .limit(perPage)
        .skip(perPage * page)
        .sort({
            [sortProperty]: sort
        })
        .then((languages) => {
            debug("Found language", languages);
            return res.status(200).json(languages)
        }).catch(err => {
            next(err);
        });

}

// New User

module.exports.register = (req, res, next) => {
    debug("New language", {
        body: req.body
    });
    User.findOne({
            languageName: req.body.languageName
        }, "-password -login_count")
        .then((foundLanguage) => {
            if (foundLanguage) {
                debug("Lenguaje de programacion duplicado");
                throw new Error(`Leguaje de programacion duplicado ${req.body.languageName}`);
            } else {
                let newLanguage = new User({
                    username: req.body.languageName,
                });
                return newUser.save();
            }
        }).then(language => {
            return res
                .header('Location', '/users/' + language.languageName)
                .status(201)
                .json({
                    languageName: language.languageName
                });
        }).catch(err => {
            console.log(err);
            res.json(err);
        });
}


// Update user 

module.exports.update = (req, res, next) => {
    debug("Update language", {
        languageName: req.params.languageName,
        ...req.body
    });

    let update = {
        ...req.body
    };

    User.findOneAndUpdate({
            languageName: req.params.languageName
        }, update, {
            new: true
        })
        .then((updated) => {
            if (updated)
                return res.status(200).json(updated);
            else
                return res.status(400).json(null);
        }).catch(err => {
            next(err);
        });
}

module.exports.delete = (req, res, next) => {

    debug("Delete language", {
        languageName: req.params.languageName,
    });

    User.findOneAndDelete({languageName: req.params.languageName})
    .then((data) =>{
        if (data) res.status(200).json(data);
        else res.status(404).send();
    }).catch( err => {
        next(err);
    })
}

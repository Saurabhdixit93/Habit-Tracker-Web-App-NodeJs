
// main homepage view
module.exports.homepage = (req ,res) => {
    return res.render('homepage' ,{
        title: 'Home Page | Habbit Tracker',
        message: { type: null, text: null },
    });
}
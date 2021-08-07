//store any global variables and export so they are public
//export is the node terminology to make smth public
module.exports = {
    "db": "mongodb+srv://Daba1996:Himer@cluster0.etkxt.mongodb.net/Project",
    'github':
    {
        'clientID': '92b34addc34450dc186d',
        'clientSecret': '5faa229adf000894487379942fe6b7362468a9fb',
        'callbackURL': 'http://localhost:4000/github/callback'
    },
    'google':{
        'clientID': '352214865678-bf6fm4o804k2fk7qkqm4jso9hcqgcbv1.apps.googleusercontent.com',
        'clientSecret': 'xf3vQPJh_NuBOUmDaS3R9Aoi',
        'callbackURL': 'http://localhost:4000/google/callback'
    }
}

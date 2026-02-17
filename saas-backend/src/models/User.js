const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },

    email : {
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        index:true
    },

    password : {
        type:String,
        required:true,
        minlength:0,
        select:false
    },

    role: {
        type:String,
        enum : ["OWNER","ADMIN","MEMBER","OWNER_TEMP"],
        default:"MEMBER"
    },

    tokenVersion : {
        type:Number,
        default:0
    },

    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: function () {
            return this.role !== "OWNER_TEMP";
        }
},

},{timestamps:true})


userSchema.pre("save", async function() {
    if (!this.isModified("password")) return;

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        
    } catch (err) {
        console.log(err)
    }
});

userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password,this.password);
}

module.exports = mongoose.model("User",userSchema);
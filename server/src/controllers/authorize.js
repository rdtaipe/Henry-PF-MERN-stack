import axios from "axios";
import UserModel from '../models/user.js'

const auth0Config = {
    domain: "dev-y87rrc6okknde1vd.us.auth0.com",
    clientId: "NJhnQ2kb0Ezl8CukUfsBI8ns4s3IxUkF",
    audience: "https://dev-y87rrc6okknde1vd.us.auth0.com/api/v2/",
    scope: "read:current_user update:current_user_metadata",
  };
const origins={
    client:["http://localhost:3000","http://localhost:3001"],
    admin:["http://localhost:3000","https://dashboard-ab660.web.app"],
} 
// name,sub,picture,email,ip,phone,location,role,status
// name,sub,picture,phone,email,ip,location,role,status
const compareUser =async (newUser) => {
    const validate = await userDataValidate(newUser);
    if(!validate){return null;}
    const {sub}= validate
    const user = await UserModel.find({sub:sub});
   
    if(!user||user.length===0){
        return saveUserAfterCompare(validate);
    }else{
        return updateUserAfterCompare(user[0],validate);
    }  
}
const userDataValidate = async(user) => {
    try{
        const {name,identities,picture,email,last_ip,email_verified} = user;
        if(!name||!identities||!picture||!email||!last_ip||!email_verified){return false;}
    
        const sub= identities[0].provider+"|"+identities[0].user_id;
        const newUser = {
            name:name,
            sub:sub,
            picture:picture,
            email:email,
            ip:last_ip,
            role:'user',
            status:'active'
        }
        return newUser;
    }catch(error){
        console.log('error: in userDataValidate')
        return null;
    }
}
const updateUserAfterCompare=async (user,newUser)=>{
    try{
    const {name,sub,picture,email,ip,email_verified} = newUser;
    const userObj = {
        name:name,
        picture:picture,
        email:email,
        ip:ip,
    }
  
    const updatedUser=await UserModel.findByIdAndUpdate(user._id.toString(),userObj,{new:true});
    return updatedUser;
    }catch(error){
        console.log('error: in updateUserAfterCompare')
        return null;
    }

}
const saveUserAfterCompare=async (newUser)=>{
try{
    const save = new UserModel(newUser);
    const newCart = new CartModel({id:save._id});
    await save.save();
    await newCart.save();
    return save;
}catch(error){
    console.log('error: in saveUserAfterCompare')
    return null;
}
   
}

export const userAuthorize = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    // const origin = req.headers.origin;
    const {user,origin} = req.headers
    if(!token||!user){res.status(401).json({message:"Unauthorized",error:'token or userId not found'});}

    try{
      
      const response = await axios.get(`https://${auth0Config.domain}/api/v2/users/${user}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        const userData = response.data;
        const newUser = await compareUser(userData);
        const mixData = {...userData,role:newUser.role,id:newUser._id,phone:newUser.phone}

    //  if(newUser===null){res.status(401).json({message:"Unauthorized",error:'user not found'});}
    //  if(newUser.role==='admin'&&origins.admin.includes(origin)){
    //     res.status(201).json({message:"Authorized",user:userData});
        
    //  }else if(newUser.role==='user'&&origins.client.includes(origin)){
    //   res.status(201).json({message:"Authorized",user:userData});
    //  }else{
    //         res.status(401).json({message:"Unauthorized",error:'user not found'});
    //     }
    res.status(201).json({message:"Authorized",user:mixData});
    }catch(err){
      res.status(401).json({message:"Unauthorized", error:err});
    }
}
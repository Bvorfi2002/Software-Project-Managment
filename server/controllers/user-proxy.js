const security_ground = require('../utils/security-ground.js');
const Admin = require('../models/users/admin.js');
const Chief = require('../models/users/chief.js');
const Installator = require('../models/users/installator.js');
const Inv_Manager = require('../models/users/inv_manager.js');
const MarketingManager = require('../models/users/marketing_manager.js');
const PhoneAgent = require('../models/users/phone_agent.js');
const SalesAgent = require('../models/users/sales_agent.js');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/users/user.js');
const { ObjectId } = require('mongodb');
const emailer = require('../utils/email.js');

const generate_user = async (name, surname, gmail, phone, role) => {
    const password = security_ground.password_generator();
    const username = security_ground.username_generator();
    let new_user = null;
    switch (role) {
        case "chief":
            new_user = new Chief({ chief_id: uuidv4(), name: name, surname: surname, email: gmail, username: username, password: password, phone: phone })
            break;
        case "installator":
            new_user = new Installator({ installator_id: uuidv4(), name: name, surname: surname, email: gmail, username: username, password: password, phone: phone })
            break;
        case "inventory":
            new_user = new Inv_Manager({ inv_manager_id: uuidv4(), name: name, surname: surname, email: gmail, username: username, password: password, phone: phone })
            break;
        case "marketing":
            new_user = new MarketingManager({ marketing_manager_id: uuidv4(), name: name, surname: surname, email: gmail, username: username, password: password, phone: phone })
            break;
        case "phone":
            new_user = new PhoneAgent({ phone_agent_id: uuidv4(), name: name, surname: surname, email: gmail, username: username, password: password, phone: phone })
            break;
        case "sales":
            new_user = SalesAgent({ sales_agent_id: uuidv4(), name: name, surname: surname, email: gmail, username: username, password: password, phone: phone })
            break;
        default:
            break;
    }
    try {
        const result = await new_user.save();
        await emailer.sendUserInfo(gmail, username, password);
        return result
    } catch (error) {
        return error.message;
    }
}

const retrieve_user_by_username = async (username) => {
    const user = await User.find({ username: username });
    return user[0];
}

const serve_user_info_by_id = async (user_id) => {
    const token_user = await User.findById(user_id, '_id name surname').exec();
    return token_user;
}

const serve_full_info_by_id = async (user_id) => {
    const user = await User.findById(user_id).exec();
    return user;
}

const first_degree_auth = async (username, password) => {
    const user = await retrieve_user_by_username(username);
    if (user) {
        const passwordVerification = security_ground.passwordVerifier(password, user.password);
        if (passwordVerification)
            return user.multifactor ? { result: true, code: 202, info: { id: user._id, email: user.email, role: user.kind } } : { result: true, user_info: { user_id: user._id, role: user.kind } }
        else
            return { result: false, message: "Wrong password!", code: 401 }
    } else {
        return { result: false, message: "User does not exist!", code: 404 }
    }
}

const second_degree_auth = async (user_id, otp) => {
    return security_ground.otpVerifier(user_id, otp);
}

const update_password = async (user_id, old_password, new_password) => {
    const user = await User.findById(user_id).exec();
    if (security_ground.passwordVerifier(user.password, old_password)) {
        if (security_ground.verifyPasswordStrength(new_password)) {
            await user.updateOne({ password: new_password });
            return { result: 1, message: "New password set successfully" };
        } else {
            return { result: 3, message: "New password is not strong enough!" }
        }
    } else {
        return { result: 2, message: "Current password was entered incorrectly" };
    }
}

const update_username = async (user_id, new_username) => {
    const user_that_may_exist = await User.findOne({ username: new_username });
    if (user_that_may_exist) {
        return { result: 2, message: "A user exists with this username!" }
    } else {
        if (security_ground.verifyUserNameStrength(new_username)) {
            await User.findOneAndUpdate({ _id: user_id }, { username: new_username });
            return { result: 1, message: "Username updated successfully" };
        } else {
            return { result: 3, message: "The username entered is not strong enough!" }
        }
    }
}

const edit_user = (user_id, new_info) => {
    const response = { result: true, message: "Edited successfully!" };
    User.findOneAndUpdate({ _id: user_id }, { ...new_info }, (err) => {
        if (err) {
            response['result'] = false;
            response['message'] = 'Unable to edit due to an error!';
        }
    })
    return response;
}

const delete_user = async (user_id) => {
    const user = await User.findById(user_id);
    await user.deleteOne();
}

const get_all_phone_agents = async ()=>{
    const agents = await User.find({ kind: 'phone_agent'});
    return agents;
}

module.exports = {
    generate_user,
    first_degree_auth,
    second_degree_auth,
    serve_full_info_by_id,
    serve_user_info_by_id,
    delete_user,
    edit_user,
    update_password,
    update_username,
    get_all_phone_agents
}
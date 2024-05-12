const Reference = require('../models/contact/reference.js');
const {ReservedCall} = require('../models/contact/call.js');

const add_reference = async (new_reference)=>{
    const reference_exists = await check_reference_existence(new_reference.phone);
    if(reference_exists)
        return "Reference already exists!";
    const ref = new Reference({
        ...new_reference
    });
    return await ref.save();
}

const check_reference_existence = async (phone_number)=>{
    const reference_that_may_exist = await Reference.findOne({phone: phone_number});
    return reference_that_may_exist ? true : false;
}

const edit_reference = async (ref_id, new_info)=>{
    const response = {result: true, message: "Edited successfully!"};
    try{
        const updatedReference = await Reference.findOneAndUpdate({_id: ref_id}, {...new_info});
        return response;
    } catch(err){
        response['message'] = err.message;
        response['result'] = false;
        return response
    }
}

const edit_reference_phone_number = async (ref_id, new_phone_number)=>{
    const reference_exists = check_reference_existence(new_phone_number);
    if(reference_exists){
        return { result: 2, message: 'A reference with this phone number exists already!' }
    }else {
        await Reference.findByIdAndUpdate(ref_id, { phone: new_phone_number });
        return {result: 1, message: 'Reference\'s phone number updated' };
    }
}

const delete_reference = async (ref_id) => {
    const response = { result: true, message: "Deleted successfully!" }
    try {
        const ref = await Reference.findById(ref_id);
        if (!ref) {
            throw new Error('Reference not found');
        }
        const reservedCall = await ReservedCall.findOne({reference_id: ref_id});
        if(reservedCall){
            throw new Error('Reference is scheduled for contact so cannot be deleted!');
        }
        await ref.deleteOne();
    } catch (error) {
        response['result'] = false;
        response['message'] = error.message;
    }
    return response;
}

const get_reference_by_id = async (ref_id)=>{
    const ref = await Reference.findById(ref_id);
    return ref;
}

const get_all_references = async ()=>{
    const references = await Reference.find({});
    const returnable = await Promise.all(references.map(async (reference) => {
        const possibleCall = await ReservedCall.findOne({ reference_id: reference._id });
        return { ...reference.toObject(), scheduled: possibleCall !== null };
    }));
    return returnable
}

const get_sales_agent_references = async(s_ag_id)=>{
    const references = await Reference.find({added_by: s_ag_id});
    return references; 
}

const get_all_references_paged = async (start, end)=>{
    const references = await Reference.find({});
    return references.slice(start, end);
}

const get_sales_agent_refernces_paged = async (start, end)=>{
    const references = await Reference.find({added_by: s_ag_id});
    return references.slice(start, end);
}

const get_all_uncalled_references = async ()=>{
    try {
        const references = await Reference.find({called: false});
        return references;
    } catch(err){
        return "An unexpected error occurred";
    }
}

module.exports = {
    add_reference,
    edit_reference,
    get_all_references,
    get_all_references_paged,
    get_reference_by_id,
    delete_reference,
    get_sales_agent_references,
    get_sales_agent_refernces_paged,
    edit_reference_phone_number,
    get_all_uncalled_references
}
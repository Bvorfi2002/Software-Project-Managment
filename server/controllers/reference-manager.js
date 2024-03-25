const Reference = require('../models/contact/reference.js');

const add_reference = async (new_reference)=>{
    const ref = new Reference({
        ...new_reference
    });
    await ref.save();
}

const edit_reference = async (ref_id, new_info)=>{
    const response = {result: true, message: "Edited successfully!"};
    Reference.findOneAndUpdate({_id: ref_id}, {...new_info}, (err)=>{
        if(err){
            response['result'] = false;
            response['message'] = 'Unable to edit due to an error!';
        }
    })
    return response;
}

const delete_reference = async (ref_id)=>{
    const ref = await Reference.findById(ref_id);
    await ref.deleteOne();
}

const get_reference_by_id = async (ref_id)=>{
    const ref = await Reference.findById(ref_id);
    return ref;
}

const get_all_references = async ()=>{
    const references = await Reference.find({});
    return references
}

const get_sales_agent_refernces = async(s_ag_id)=>{
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

module.exports = {
    add_reference,
    edit_reference,
    get_all_references,
    get_all_references_paged,
    get_reference_by_id,
    delete_reference,
    get_sales_agent_refernces,
    get_sales_agent_refernces_paged
}
const InventoryItem = require('../models/maintenance/inventory_item');
const mongoose = require('mongoose');

const getAllItems = async ()=>{
    try{
        const items = await InventoryItem.find({});
        return { result: true, items: items };
    } catch(error) {
        return { result: false, message: error.message }
    }
}

const addItem = async (item)=>{
    try {
        const newItem = new InventoryItem({ ...item });
        await newItem.save();
        return { result: true, message: "Added successfully!" };
    } catch(error) {
        return { result: false, message: error.message };
    }
}

const editItem = async (itemId, newInfo)=>{
    try {
        const editedItem = await InventoryItem.findByIdAndUpdate(itemId, { ...newInfo });
        return { result: true, message: "Edited successfull!" };
    } catch(error) {
        return { result: false, message: error.message };
    }
}

const addQuantity = async (itemId, quantity)=>{
    try {
        const item = await InventoryItem.findById(itemId);
        await item.increaseQuantity(quantity);
        return { result: true, message: "Increased successfull!" };
    } catch(error) {
        return { result: false, message: error.message };
    }
}

const deleteItem = async (itemId)=>{
    try {
        const item = await InventoryItem.findById(itemId);
        if(item.itemQuantity > 0){
            throw new Error("Item with quantity cannot be deleted!");
        }
        await item.deleteOne();
        return { result: true, message: "Deleted successfull!" };
    } catch(error) {
        return { result: false, message: error.message };
    }
}

module.exports = {
    deleteItem,
    addQuantity,
    addItem,
    editItem,
    getAllItems
}
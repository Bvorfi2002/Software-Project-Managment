const mongoose = require('mongoose');
const Transaction = require('../financial/transaction.js');

const inventoryItemSchema = new mongoose.Schema({
    itemName: { type: String, required: true, unique: true },
    itemBuyingPrice: { type: mongoose.Schema.Types.Decimal128, required: true },
    itemQuantity: { type: Number, required: true, default: 0 },
    itemStockAlert: { type: Number, required: true, default: 0 }
})

inventoryItemSchema.methods.increaseQuantity = async function(quantity){
    this.itemQuantity = parseInt(this.itemQuantity) + parseInt(quantity);
    await this.save();
    const transactionValue = parseFloat(quantity) * parseFloat(this.itemBuyingPrice);
    const newTransaction = new Transaction({
        transaction_type: "inventory transaction",
        incoming: false,
        date: new Date(),
        comments: `This is verified transaction of the aquisition of ${quantity} pieces of ${this.itemName}`,
        amount: transactionValue
    });
    await newTransaction.save();
} 

const InventoryItemModel = mongoose.model("InventoryItem", inventoryItemSchema);

module.exports = InventoryItemModel;
const mongoose = require('mongoose');

const commissionSchema = new mongoose.Schema({
    agent_id: {type: String},
    current_status: String,
    amount: Schema.Types.Decimal128,
    date: Date,
    approved: Boolean
});

commissionSchema.methods.updateCommissionSales = ()=>{

}

commissionSchema.methods.updateCommissionPhone = (type_of_update)=>{
    if (type_of_update === 0){
        this.amount += 1.5;
    }else if(type_of_update === 1){
        this.amount += (1.5 + 5);
    }else{
        this.amount += 10;
    }
}

commissionSchema.methods.changeStatus = ()=>{
    //Still not sure how to proceed here. The initial idea is that a transaction is created once this commission is released
    //And a new active commission with 0 amount will be created for that agent.
}

const commissionModel = mongoose.model('Commission', commissionSchema);

module.exports = commissionModel;
const Organization = require('../models/Organization');


const upgradePlan = async(tenantId)=>{
    const org = await Organization.findById(tenantId);

    if(!org) throw new Error("Organization not found");

    if(org.plan === "PRO") throw new Error("Already a PRO plan");

    org.plan = "PRO";
    await org.save();

    return org;
}

module.exports = {upgradePlan};


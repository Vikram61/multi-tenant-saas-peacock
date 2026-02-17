import client from './client';

export const fetchOrg = async()=>{
    const res = await client.get('/org/me');
    return res.data;
    
}
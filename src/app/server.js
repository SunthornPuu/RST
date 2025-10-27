import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://sdsyqwronpnuztzfdhmf.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkc3lxd3JvbnBudXp0emZkaG1mIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjczMDk4OSwiZXhwIjoyMDcyMzA2OTg5fQ.WvHdWIp5-8sonH_2yauelbpAx90GoMxd-8e6_ngRjrw')


async function fetchData(dataHandle) {
  const { data, error } = await supabase.from('goods').select('*');
  console.log(data);
  if (error) console.error(error);
  else {dataHandle(data);}
}


async function create(data,olddata,dataHandle){
        await supabase
        .from('goods')  
        .insert([
         { 
                name: data.name,
                seller: data.seller,
                price: data.price,
                xI: data.xI,yI: data.yI,zI: data.zI,
                xCm: data.xCm,yCm: data.yCm,zCm: data.zCm,img: data.img
         }
  ]);
  olddata.push(data);
  dataHandle(olddata);
}

export {fetchData,create,ezload};
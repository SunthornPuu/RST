import Backdrop from './backdrop'
import List from './list'
// import sample from './database.json';
import Engine from './engine'

const Main=({isOpen,onClose,data,dataHandle,database})=>{
          console.log("database in search: ",database);

        if(isOpen)return( <div>
                <Backdrop onClick={onClose} />
                <div className='bg-white border-4 border-black rounded-b-3xl fixed inset-10 z-20'>
                        <Engine dataHandle={dataHandle} database={database}/>
                        <List list={data}/>
                </div>
        </div>);
        else return null;
}

export default Main;
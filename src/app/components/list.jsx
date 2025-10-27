import Item from './item'

const Main=({list})=>{
        console.log(list);
        return(
                <div className=' bg-stone-100 flex flex-col h-4/5 w-11/12 mx-auto overflow-y-scroll border-stone-600 border-1/2 z-30 gap-6'>
                        {list.map((x)=>{
                                return <Item data={x}/>;
})}
                </div>
        )
}

export default Main;
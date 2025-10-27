const Main=({data})=>{

        return(
                <div className="w-10/12 flex flex-row items-center justify-center bg-stone-50 gap-x-14 py-6 shadow-2xl shadow-stone-400 rounded-md mx-auto">
                        <img src={data.img} className="w-1/3"/>
                        <div className="flex flex-col">
                                <p className="header1">{data.name}</p>
                                <p className="font-mono text-1xl font-semibold">by: {data.seller}</p>
                                <p className="text-md italic">{data.xI} x {data.yI} x {data.zI} inches.</p>
                                <p className="text-md italic">{data.xCm} x {data.yCm} x {data.zCm} cm.</p>
                                <p className="font-mono text-2xl font-bold text-green-400">{data.price} .-</p>
                        </div>
                </div>
        )
}
export default Main;
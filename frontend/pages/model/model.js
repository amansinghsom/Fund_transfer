function Model({ setModal, value, setValue ,transfer}) {
    return (
        <div className='fixed  z-50 inset-0  '>
            <div className='flex justify-center items-center h-screen  ' >
                <div className="absolute inset-0 bg-white-900 opacity-75" />

                <div className='w-[400px] bg-white bg-blend-hard-light shadow-2xl border  h-[250px] z-50 '>


                    <div className="text-center mt-7 text-gray-600">
                        <h1 className='text-4xl font-bold '>Enter  value 🚀</h1>
                        <form className='mt-5' onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <input type={'text'} value={value} onChange={e => {
                                setValue(e.target.value);
                            }} className='bg-white p-3 border border-solid border-gray-600' placeholder='Enter ether value' />
                            <div className='pt-5'>
                                <button className='font-bold p-2 mr-5  bg-blue-500 shadow-lg shadow-blue-500/50 text-white  '  type={"Submit" } 
                                onClick={transfer}
                                >Done</button>
                                <button className="bg-cyan-500 shadow-xl shadow-cyan-500/50 p-2 font-bold text-white" onClick={() => {
                                    setModal(false)
                                }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>





        </div>
    )
}

export default Model;
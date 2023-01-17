import React, { useState, useEffect } from 'react'
import Web3 from 'web3';
import Model from './model/model'
import detectEthereumProvider from '@metamask/detect-provider';
import contract from "@truffle/contract";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/*
    use this code for Access for deploy and access functionality of smart contract 
*/

const SmContract = async (name, provider) => {
    const res = await fetch(`/contracts/${name}.json`);
    const Artifact = await res.json();
    const _contract = contract(Artifact);
    console.log("dd:rocket")
    _contract.setProvider(provider);
    const deployedContract = await _contract.deployed();
    return deployedContract;
};

export default function App() {
    const [model, setModal] = useState(false);
    const [_web3, setweb3] = useState({
        provider: null,
        web3: null,
        contract: null,
    });

    const [account, setaccount] = useState(false);
    const [_balance, setbalance] = useState(false);
    const [value, setValue] = useState(0);
    const [reload, setreload] = useState(false);
    const [Cbalance, CsetBalance] = useState(null);

    const reloadEffect = () => { setreload(!reload) }
    const notify = (e) => toast.error(e, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    useEffect(() => {
        (
            async () => {
                const provider = await detectEthereumProvider();
                if (provider) {
                    provider.request({ method: "eth_requestAccounts" }); //open metamask and enable
                    const contract = await SmContract("Funder", provider);

                    //pass metamask object into web3

                    setweb3({
                        web3: new Web3(provider),
                        provider,
                        contract

                    });

                    reloadEffect();
                } else {
                    console.log('Please install MetaMask!');
                }

            }
        )()
    }, []);

    useEffect(() => {
        (
            async () => {
                if (_web3.contract) {
                    const { web3, contract } = _web3;
                    console.log(web3)
                    const address = await web3?.eth?.getAccounts()
                    const balance = await web3?.eth?.getBalance(address[0])
                    const Ethers = await web3?.utils?.fromWei(balance)
                    const Cbalance1 = await web3?.eth?.getBalance(contract.address)
                    setbalance(Ethers)
                    CsetBalance(Cbalance1)
                    setaccount(address[0])
                }

            }
        )()
    }, [reload])

    const transfer = async () => {
        console.log(value);
        // setValue("")
        setModal(!model);
        if (value !== "") {
            const { contract, web3 } = _web3;
            console.log(contract)
            console.log(web3)
            const p=await contract.sendTransaction({
                from: account,
                value: web3.utils.toWei(value, "ether"),
            });
            console.log(p);
            toast.success("send 🤑", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            reloadEffect();
        } else {
            notify("Value not found 🚀");
        }

    }
    const WithDraw = async()=>{
        const { contract, web3 } = _web3;
        const withdrawAmout = web3.utils.toWei("2", "ether");
        const p=await contract.withdraw(withdrawAmout,{
            from: account,
        });
        reloadEffect();
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={800}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className=' h-[100vh] text-center '>
                <div className='flex justify-center items-center md:w-[800px] h-[700px]   m-auto flex-col '>
                    <h1 className='text-3xl font-bold '>Ethereum  Fund Transfer 🚀  </h1>

                    <div className='pt-7 text-center'>
                        <h2 className='font-bold text-xl'> Fund  Balance : {Cbalance ? Cbalance : 'Nothing found '} Eth</h2>
                        <h2 className='pt-2 md:text-xl'>Current Account : {account ? account : ""}</h2>
                        <h2 className='pt-2 text-xl'>Current  Balance :{_balance ? _balance : 'Nothing found '} Eth </h2>
                        <div className='flex justify-center pt-5 '>
                            <button className='font-bold p-2 mr-5  bg-blue-500 shadow-lg shadow-blue-500/50' onClick={() => { setModal(true) }} >Transfer</button>
                            <button className="bg-cyan-500 shadow-xl shadow-cyan-500/50 p-2 font-bold " onClick={WithDraw}>WithDraw</button>
                        </div>

                    </div>
                </div>

            </div>
            {model && <Model setModal={setModal} setValue={setValue} transfer={transfer} value={value} />}

        </>
    )
}

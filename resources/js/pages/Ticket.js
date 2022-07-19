import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { SpinnerCircular } from 'spinners-react'
import Checkbox from '../components/Checkbox'
import logo from '../../img/logo.png'
import user from '../../img/user.png'
import ring from '../../img/ring.svg'
import warning from '../../img/warning.svg'
import phone1 from '../../img/phone1.png'
import phone2 from '../../img/phone2.png'
import phone3 from '../../img/phone3.png'
import phone4 from '../../img/phone4.png'

function Ticket() {
    const [imgFlag, setImgflag] = useState('block')
    const [existflag, setExistflag] = useState(false)
    const [sniperflag, setSniperflag] = useState(false)
    const [search, setSearch] = useState('')
    const [msg, setMsg] = useState('')

    const [isCount, setIsCount] = useState(0)
    const [isCheck, setIsCheck] = useState([])
    const [list, setList] = useState([])

    useEffect(() => {
        const count = isCheck.filter((item) => item === true).length
        setIsCount(count)
    }, [isCheck])

    useEffect(() => {
        const setImgshow = () => {
            return window.innerWidth < 1140
                ? setImgflag('hidden')
                : setImgflag('block')
        }
        setImgshow()
        window.addEventListener('resize', () => setImgshow())
    })

    const handleSelectAll = (e) => {
        let ischeck_ = []
        list.forEach((item, index) => {
            ischeck_[index + 1] = true
        })
        setIsCheck([...ischeck_])
    }

    const handleChange = (e) => {
        let state = e.target.checked
        let item = e.target.name.split('_')[1]
        let ischeck_ = isCheck
        ischeck_[item] = state
        setIsCheck([...ischeck_])
    }

    const catalog = list.map((item, index) => {
        return (
            <div
                className="flex justify-between rounded-md bg-gray px-7 py-4 my-4"
                key={index}
            >
                <Checkbox
                    key={index}
                    type="checkbox"
                    name={'checkbox_' + (index + 1)}
                    handleClick={handleChange}
                    isChecked={isCheck[index + 1] ? true : false}
                />
                <p className="flex items-center w-11/12 lg:text-lg md:text-lg_1 sm:text-lg text-base lg:mr-10 md:mr-2 sm:mr-2 ml-2">
                    {item}
                </p>
            </div>
        )
    })

    const handleClick = async () => {
        if (!search.trim()) {
            alert('please input')
            return
        } else if (search.length < 6) {
            alert('The search must be at least 6 characters.')
        } else {
            setExistflag(false)
            setSniperflag(true)
            try {
                await axios.post('openapi/search', { search }).then((res) => {
                    console.log(res)
                    console.log(res.status)
                    if (res.status === 200) {
                        if (res.data.error) {
                            setMsg(res.data.error.message)
                        } else {
                            if (res.data.choices[0].text) {
                                const source = res.data.choices[0].text
                                const toks = source
                                    .split('\n')
                                    .map((s) => s.trim())
                                    .filter((s) => s)
                                    .map(
                                        (s) =>
                                            s.match(
                                                /\d+\.\s+(?:\w+\s*\w+\s*[\-\:\–]\s*)?\s*(.*)/
                                            )[1]
                                    )
                                setList(toks)
                            }
                        }
                    }
                    setExistflag(true)
                    setSniperflag(false)
                })
            } catch (err) {
                throw err
            }
        }
    }

    return (
        <div className="ticket-container bg-lightblue">
            <div className="lg:px-40 md:px-40 sm:px-10 px-5 pb-28">
                <div className="pt-12">
                    <div className="flex justify-between">
                        <div>
                            <img src={logo} />
                        </div>
                        <div className="flex">
                            <div className="lg:pr-12 md:pr-12 sm:pr-10 pr-5 pt-1 relative">
                                <img src={ring} />
                                <span
                                    className="absolute lg:right-10 md:right-10 sm:right-8 right-3 top-4 rounded-full 
                                    lg:w-5 lg:h-5 md:w-5 md:h-5 sm:w-5 sm:h-5 w-4 h-4 lg:text-sm md:text-sm sm:text-sm text-vsm text-white text-center bg-orange"
                                >
                                    3
                                </span>
                            </div>
                            <div>
                                <img src={user} />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between pt-20">
                        <div className="w-3/4 mr-3.5">
                            <div className="relative">
                                <label className="absolute lg:bottom-24 md:bottom-24 sm:bottom-16 bottom-16 lg:text-lg md:text-lg sm:text-sm font-bold">
                                    Headline
                                </label>
                                <input
                                    type="text"
                                    className="border-solid border-2 rounded-md border-blue w-full lg:text-xl 
                                    md:text-lg sm:text-lg text-base lg:px-8 lg:py-6 md:px-8 md:py-6 sm:px-6 sm:py-4 px-6 py-3"
                                    placeholder="Please input..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="w-1/4">
                            <button
                                className="flex justify-center items-center bg-blue border-solid border-2 rounded-md border-blue 
                                    text-white text-center font-bold w-full lg:py-6 md:py-6 sm:py-4 py-3 lg:text-xl 
                                    md:text-lg sm:text-lg text-base text-center h-full relative"
                                onClick={handleClick}
                                disabled={sniperflag}
                            >
                                {sniperflag ? (
                                    <SpinnerCircular
                                        className="absolute"
                                        enabled={sniperflag}
                                        size={35}
                                        thickness={122}
                                        speed={100}
                                        color="rgba(1, 106, 233, 1)"
                                        secondaryColor="rgba(255, 255, 255, 1)"
                                    />
                                ) : (
                                    <>Search</>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-6">
                    <div className="flex justify-between">
                        <p className="lg:text-lg md:text-lg_1 sm:text-lg text-base">
                            Headline suggestions for{' '}
                            <span className="font-bold">"{search}"</span>
                        </p>
                        <p
                            className="lg:text-lg md:text-lg_1 sm:text-lg text-base text-blue font-bold cursor-pointer"
                            onClick={handleSelectAll}
                        >
                            Select&nbsp;all
                        </p>
                    </div>
                    <div className="flex justify-between rounded-md bg-lightblue mt-6 lg:px-28 md:px-16 sm:px-14 px-4 py-4">
                        <p className="whitespace-wrap lg:text-lg md:text-lg_1 sm:text-lg text-base w-full">
                            You're using a
                            <span className="font-bold">
                                &nbsp;free version
                            </span>{' '}
                            of this tool |{' '}
                            <span className="font-bold">2&nbsp;</span>
                            out of <span className="font-bold">3</span> free
                            daily searches available
                        </p>
                        <div className="flex items-center">
                            <button
                                className="bg-blue border-solid rounded-md border-blue text-white 
                            text-center lg:px-4 md:px-3 sm:px-2 px-1 lg:h-8 md:h-8 
                            h-7 lg:text-sm md:text-vsm text-vssm"
                            >
                                Upgrade
                            </button>
                        </div>
                    </div>
                    {catalog}
                </div>

                <div className="rounded-md bg-blue w-full relative">
                    {existflag ? (
                        <>
                            {list.length > 0 ? (
                                <>
                                    <div className="lg:px-14 md:px-8 sm:px-6 px-4 py-10 mt-14">
                                        <p className="text-white font-bold lg:text-xl md:text-lg sm:text-lg text-base">
                                            {isCount} headlines are selected.
                                        </p>
                                        <p className="text-white lg:text-sm md:text-sm text-vsm mt-2">
                                            Test these headlines by launching a
                                            Google Ad Headline Test
                                        </p>
                                        <button
                                            className="bg-white border-solid border-2 rounded-md border-blue text-blue font-bold 
                                                lg:text-sm md:text-sm text-vsm text-center lg:px-6 md:px-5 px-2 lg:py-2 md:py-2 py-1 mt-6"
                                        >
                                            Create Test
                                        </button>
                                    </div>
                                    <img
                                        src={phone1}
                                        className={
                                            'absolute bottom-0 right-36 ' +
                                            imgFlag
                                        }
                                    />
                                    <img
                                        src={phone2}
                                        className={
                                            'absolute bottom-0 right-14 ' +
                                            imgFlag
                                        }
                                    />
                                    <img
                                        src={phone3}
                                        className={
                                            'absolute bottom-0 right-0 ' +
                                            imgFlag
                                        }
                                    />
                                    <img
                                        src={phone4}
                                        className={
                                            'absolute bottom-0 right-0 ' +
                                            imgFlag
                                        }
                                    />
                                </>
                            ) : (
                                <div className="rounded-md bg-gray px-7 py-8 my-4 relative">
                                    <img
                                        src={warning}
                                        className="absolute top-9"
                                    />
                                    <div className="ml-8">
                                        <p className="flex items-center w-11/12 lg:text-lg md:text-lg_1 sm:text-lg text-base lg:mr-10 md:mr-2 sm:mr-2 font-bold">
                                            Oops, no data to display
                                        </p>
                                        <p className="flex items-center lg:text-lg md:text-lg_1 sm:text-lg text-base lg:mr-10 md:mr-2 sm:mr-2 mt-4">
                                            {msg}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Ticket

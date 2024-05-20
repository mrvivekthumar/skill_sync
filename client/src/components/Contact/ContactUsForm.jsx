import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import CountryCode from "../../data/countrycode.json"
import { apiConnector } from "../../services/apiConnector"
import { contactusEndpoint } from "../../services/api"

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm()

    const submitContactForm = async (data) => {
        // console.log("Form Data - ", data)
        try {
            setLoading(true)
            const res = await apiConnector(
                "POST",
                contactusEndpoint.CONTACT_US_API,
                data
            )
            // console.log("Email Res - ", res)
            setLoading(false)
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: "",
            })
        }
    }, [reset, isSubmitSuccessful])

    return (
        <form
            className="flex flex-col gap-7"
            onSubmit={handleSubmit(submitContactForm)}
        >
            <div className="flex flex-col gap-5 lg:flex-row">
                {/* first Name */}
                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor="firstname" className="lable-style">
                        First Name
                    </label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="Enter First Name"
                        className="form-style bg-richblack-800 p-2 rounded-md"
                        {...register("firstname", { required: true })}
                    />
                    {errors.firstname && (
                        <span className="text-[12px] text-reddit-600 font-medium">
                            PLEASE ENTER YOUR NAME.
                        </span>
                    )}
                </div>

                {/* Last Name */}
                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor="lastname" className="lable-style">
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="Enter Last Name"
                        className="form-style  bg-richblack-800 p-2 rounded-md"
                        {...register("lastname")}
                    />
                </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="lable-style">
                    Email Address
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="on"
                    placeholder="Enter Email Address"
                    className="form-style  bg-richblack-800 p-2 rounded-md"
                    {...register("email", { required: true })}
                />
                {errors.email && (
                    <span className="text-[12px] text-reddit-600 font-medium">
                        PLEASE ENTER YOUR EMAIL.
                    </span>
                )}
            </div>

            {/*Phone Number */}
            <div className="flex flex-col gap-2">
                <label htmlFor="phonenumber" className="lable-style">
                    Phone Number
                </label>

                <div className="flex gap-5">
                    <div className="flex w-[81px] flex-col gap-2">
                        <select
                            type="text"
                            name="firstname"
                            id="FirstName"
                            placeholder="Enter First Name"
                            className="form-style  bg-richblack-800 p-2 rounded-md w-28"
                            {...register("countrycode", { required: true })}
                        >
                            {CountryCode.map((ele, i) => {
                                return (
                                    <option key={i} value={ele.code}>
                                        {ele.code} - {ele.country}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                        <input
                            type="number"
                            name="phonenumber"
                            id="phonenumber"
                            placeholder="98765 43210"
                            className="form-style  bg-richblack-800 p-2 rounded-md mx-6"
                            {...register("phoneNo", {
                                required: {
                                    value: true,
                                    message: "PLEASE ENTER YOUR PHONE NUMBER.",
                                },
                                maxLength: { value: 12, message: "Invalid Phone Number" },
                                minLength: { value: 10, message: "Invalid Phone Number" },
                            })}
                        />
                    </div>
                </div>
                {errors.phoneNo && (
                    <span className="text-[12px] text-reddit-600 font-medium">
                        {errors.phoneNo.message}
                    </span>
                )}
            </div>

            {/* Messages */}
            <div className="flex flex-col gap-2">
                <label htmlFor="message" className="lable-style">
                    Message
                </label>
                <textarea
                    name="message"
                    id="message"
                    cols="30"
                    rows="7"
                    placeholder="Enter Your Message Here"
                    className="form-style  bg-richblack-800 p-2 rounded-md"
                    {...register("message", { required: true })}
                />
                {errors.message && (
                    <span className="text-[12px] text-reddit-600 font-medium">
                        PLEASE ENTER YOUR MESSAGE.
                    </span>
                )}
            </div>

            <button
                disabled={loading}
                type="submit"
                className={`rounded-md bg-yellow-600 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${!loading &&
                    "transition-all duration-200 hover:scale-95 hover:shadow-none"
                    }  disabled:bg-richblack-500 sm:text-[16px] `}
            >
                Send Message
            </button>
        </form>
    )
}

export default ContactUsForm